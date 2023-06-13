import { hasItemWithSourceId } from '@utils/foundry/item'
import { info } from '@utils/foundry/notification'
import { subLocalize } from '@utils/foundry/localize'
import { addStance, getEffects, getStances } from './stances'

const STANCE_SAVANT: ItemUUID[] = [
    'Compendium.pf2e.feats-srd.Item.yeSyGnYDkl2GUNmu',
    'Compendium.pf2e.feats-srd.Item.LI9VtCaL5ZRk0Wo8',
]

export async function checkForSavant(actor: CharacterPF2e) {
    if (!hasItemWithSourceId(actor, STANCE_SAVANT, ['feat'])) return
    if (getEffects(actor).length) return

    const stances = getStances(actor)
    if (!stances.length) return

    if (stances.length === 1) {
        const stance = stances[0]!
        if (await addStance(actor, stance.effectUUID)) info('useStance', { stance: stance.name })
    } else {
        openStancesMenu(actor, stances)
    }
}

function openStancesMenu(actor: CharacterPF2e, stances: ReturnedStance[]) {
    const localize = subLocalize('menu')
    let content = `<h3>${localize('select')}</h3>`

    for (let i = 0; i < stances.length; i++) {
        const stance = stances[i]!
        content += `<label style="height: 24px; display: block;">`
        content += `<input type="radio" name="stance" value="${stance.effectUUID}"`
        if (i === 0) content += ' checked'
        content += ` style="margin-right: .5em;"> <span>${stance.name}</span></label>`
    }

    content += '<div style="margin-bottom: .5em;"></div>'

    new Dialog({
        title: localize('title'),
        content,
        buttons: {
            yes: {
                icon: '<i class="fa-solid fa-people-arrows"></i>',
                label: localize('accept'),
                callback: html => addStance(actor, html.find('[name=stance]:checked')!.val() as ItemUUID),
            },
            no: {
                icon: '<i class="fa-solid fa-xmark"></i>',
                label: localize('cancel'),
            },
        },
    }).render(true)
}
