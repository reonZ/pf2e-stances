import { setModuleID } from '@utils/module'
import { registerSetting } from '@utils/foundry/settings'
import { checkForSavant } from './savant'
import { refreshCharacterSheets, renderCharacterSheetPF2e } from './sheet'
import { getActionsUUIDS, getEffects, getStances, parseCustomStances, toggleStance } from './stances'
import { getCurrentModule } from '@utils/foundry/module'

export const MODULE_ID = 'pf2e-stances'
setModuleID(MODULE_ID)

Hooks.once('setup', () => {
    registerSetting({
        name: 'custom',
        type: String,
        default: '',
        config: true,
        onChange: parseCustomStances,
    })
})

Hooks.once('ready', () => {
    parseCustomStances()

    getCurrentModule<PF2eStancesApi>().api = {
        getStances,
        getActionsUUIDS,
        toggleStance,
    }
})

Hooks.on('deleteCombatant', deleteCombatant)
Hooks.on('createCombatant', createCombatant)
Hooks.on('deleteCombat', deleteCombat)

Hooks.on('renderCharacterSheetPF2e', renderCharacterSheetPF2e)

function deleteCombat(combat: Combat) {
    for (const combatant of combat.combatants) {
        deleteCombatant(combatant)
    }
}

function deleteCombatant(combatant: Combatant) {
    const actor = getActorFromCombatant(combatant)
    if (!actor) return

    if (game.user.isGM) {
        const effects = getEffects(actor).map(effect => effect.id)
        if (effects.length) actor.deleteEmbeddedDocuments('Item', effects)
    }

    refreshCharacterSheets(actor)
}

function createCombatant(combatant: Combatant) {
    const actor = getActorFromCombatant(combatant)
    if (!actor) return

    if (!game.user.isGM && actor.isOwner) checkForSavant(actor)

    refreshCharacterSheets(actor)
}

function getActorFromCombatant(combatant: Combatant) {
    const actor = (combatant as CombatantPF2e).actor
    if (!actor || actor.isToken || !actor.isOfType('character')) return
    else return actor
}
