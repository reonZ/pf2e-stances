import { localize } from '@utils/foundry/localize'
import { templatePath } from '@utils/foundry/path'
import { addStance, getEffects, getStances } from './stances'

export async function renderCharacterSheetPF2e(sheet: CharacterSheetPF2e, html: JQuery) {
    const actor = sheet.actor
    await addStances(actor, html)

    html.find(
        '.sheet-body .sheet-content [data-tab=actions] .tab-content .actions-panels [data-tab=encounter] .pf2e-stances .pf2e-stances__stance'
    ).on('click', event => onToggleStance(event, actor))
}

export function refreshCharacterSheets(actor: CharacterPF2e) {
    for (const win of Object.values(ui.windows)) {
        if (!(win instanceof ActorSheet)) continue
        if (actor === (win as ActorSheetPF2e).actor) win.render()
    }
}

async function onToggleStance(event: JQuery.ClickEvent<any, any, HTMLElement>, actor: CharacterPF2e) {
    const target = event.currentTarget
    const canUseStances = target.closest('.pf2e-stances')?.classList.contains('can-use-stances')
    if (!event.ctrlKey && !canUseStances) return

    const effectUUID = target.dataset.effectUuid as ItemUUID
    const effects = getEffects(actor)
    const already = effects.findIndex(effect => effect.uuid === effectUUID)

    let create = false

    if (already < 0) {
        create = true
    } else if (effects.length) {
        const other = effects.filter(effect => effect.uuid !== effectUUID).length
        const more = effects.filter(effect => effect.uuid === effectUUID).length > 1
        if (other || more) effects.splice(already, 1)
    }

    if (effects.length) {
        await actor.deleteEmbeddedDocuments(
            'Item',
            effects.map(x => x.id)
        )
    }

    if (create) addStance(actor, effectUUID)
}

async function addStances(actor: CharacterPF2e, html: JQuery) {
    const stances = getStances(actor).sort((a, b) => a.name.localeCompare(b.name))
    if (!stances.length) return

    const inCombat = actor.getActiveTokens(true, true).some(token => token.inCombat)
    const tab = html.find('.sheet-body .sheet-content [data-tab=actions] .tab-content .actions-panels [data-tab=encounter]')
    const options = tab.find('.actions-options')
    const template = await renderTemplate(templatePath('stances.hbs'), {
        stances,
        canUseStances: inCombat && !actor.isDead,
        i18n: localize,
    })

    if (options.length) options.after(template)
    else tab.prepend(template)
}
