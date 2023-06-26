import { getSourceId } from '@utils/foundry/flags'
import { getSetting } from '@utils/foundry/settings'
import { error } from '../../../../../foundryVTT-projects/@utils/foundry/notification'

const STANCES: StanceData[] = [
    {
        // Arcane Cascade
        feat: 'Compendium.pf2e.classfeatures.Item.09iL38CZZEa0q0Mt',
        effect: 'Compendium.pf2e.feat-effects.Item.fsjO5oTKttsbpaKl',
        action: 'Compendium.pf2e.actionspf2e.Item.HbejhIywqIufrmVM',
    },
    {
        // Buckler Dance
        feat: 'Compendium.pf2e.feats-srd.Item.tDWc2LQNl0Op1Auq',
        effect: 'Compendium.pf2e.feat-effects.Item.PS17dsXkTdQmOv7w',
    },
    {
        // Bullet Dancer Stance
        feat: 'Compendium.pf2e.feats-srd.Item.j1hhTLOq7o80XCyV',
        effect: 'Compendium.pf2e.feat-effects.Item.6ctQFQfSZ6o1uyyZ',
        action: 'Compendium.pf2e.actionspf2e.Item.SMF1hTWPHtmlS8Cd',
    },
    {
        // Cobra Stance
        feat: 'Compendium.pf2e.feats-srd.Item.AkV4Jyllo6nlK2Sl',
        effect: 'Compendium.pf2e.feat-effects.Item.CgxYa0lrLUjS2ZhI',
    },
    {
        // Cobra Stance (Envenom)
        feat: 'Compendium.pf2e.feats-srd.Item.xQuNswWB3eg1UM28',
        effect: 'Compendium.pf2e.feat-effects.Item.2Qpt0CHuOMeL48rN',
        replace: 'Compendium.pf2e.feats-srd.Item.AkV4Jyllo6nlK2Sl', // Cobra Stance
    },
    {
        // Crane Stance
        feat: 'Compendium.pf2e.feats-srd.Item.bf7NCeKqDClaqhTR',
        effect: 'Compendium.pf2e.feat-effects.Item.nwkYZs6YwXYAJ4ps',
    },
    {
        // Disarm Stance
        feat: 'Compendium.pf2e.feats-srd.Item.1p5ErCp33nGOzEsk',
        effect: 'Compendium.pf2e.feat-effects.Item.LxSev4GNKv26DbZw',
    },
    {
        // Disruptive Stance
        feat: 'Compendium.pf2e.feats-srd.Item.OEGhbRgW6wRbccns',
        effect: 'Compendium.pf2e.feat-effects.Item.qBR3kqGCeKp3T2Be',
    },
    {
        // Dragon Stance
        feat: 'Compendium.pf2e.feats-srd.Item.8sy3sHwOHS4ImwvJ',
        effect: 'Compendium.pf2e.feat-effects.Item.qUowHpn79Dpt1hVn',
    },
    {
        // Dread Marshal Stance
        feat: 'Compendium.pf2e.feats-srd.Item.R7c4PyTNkZb0yvoT',
        effect: 'Compendium.pf2e.feat-effects.Item.KBEJVRrie2JTHWIK',
    },
    {
        // Dueling Dance (Fighter)
        feat: 'Compendium.pf2e.feats-srd.Item.FYz5eQeTox9IDkSd',
        effect: 'Compendium.pf2e.feat-effects.Item.KiuBRoMFxL2Npt51',
    },
    {
        // Dueling Dance (Swashbuckler)
        feat: 'Compendium.pf2e.feats-srd.Item.9VGmE7X4aK2W8YWj',
        effect: 'Compendium.pf2e.feat-effects.Item.KiuBRoMFxL2Npt51',
    },
    {
        // Everstand Stance
        feat: 'Compendium.pf2e.feats-srd.Item.6GN1zh3RcnZhrzxP',
        effect: 'Compendium.pf2e.feat-effects.Item.GGebXpRPyONZB3eS',
    },
    {
        // Fane's Fourberie
        feat: 'Compendium.pf2e.feats-srd.Item.80CEAB05TP5ki9iW',
        effect: 'Compendium.pf2e.feat-effects.Item.GvqB4M8LrHpzYEvl',
    },
    {
        // Gorilla Stance
        feat: 'Compendium.pf2e.feats-srd.Item.DqD7htz8Sd1dh3BT',
        effect: 'Compendium.pf2e.feat-effects.Item.RozqjLocahvQWERr',
    },
    {
        // Gorilla Stance (Pound)
        feat: 'Compendium.pf2e.feats-srd.Item.nRjyyDulHnP5OewA',
        effect: 'Compendium.pf2e.feat-effects.Item.UZKIKLuwpQu47feK',
        replace: 'Compendium.pf2e.feats-srd.Item.DqD7htz8Sd1dh3BT',
    },
    {
        // Graceful Poise
        feat: 'Compendium.pf2e.feats-srd.Item.rFaUJtB46scuAidY',
        effect: 'Compendium.pf2e.feat-effects.Item.mark4VEQoynfYNBF',
    },
    {
        // Impassable Wall Stance
        feat: 'Compendium.pf2e.feats-srd.Item.YeyOqNFKaeuOTiJr',
        effect: 'Compendium.pf2e.feat-effects.Item.zzC2qZwEKf4Ja3xD',
    },
    {
        // Inspiring Marshal Stance
        feat: 'Compendium.pf2e.feats-srd.Item.bvOsJNeI0ewvQsFa',
        effect: 'Compendium.pf2e.feat-effects.Item.kzEPq4aczYb6OD2h',
    },
    {
        // Ironblood Stance
        feat: 'Compendium.pf2e.feats-srd.Item.x9cYkB8DrUBBwqJd',
        effect: 'Compendium.pf2e.feat-effects.Item.tPKXLtDJ3bzJcXlv',
    },
    {
        // Jellyfish Stance
        feat: 'Compendium.pf2e.feats-srd.Item.Jwq5o13uZF3ooln1',
        effect: 'Compendium.pf2e.feat-effects.Item.pkcr9w5x6bKzl3om',
    },
    {
        // Lunging Stance
        feat: 'Compendium.pf2e.feats-srd.Item.ZghzLmYgeE19GqjP',
        effect: 'Compendium.pf2e.feat-effects.Item.W8CKuADdbODpBh6O',
    },
    {
        // Masquerade of Seasons Stance
        feat: 'Compendium.pf2e.feats-srd.Item.KMVXUgFArcftg1jQ',
        effect: 'Compendium.pf2e.feat-effects.Item.6IsZQpwRJQWIzdGx',
    },
    {
        // Mobile Shot Stance
        feat: 'Compendium.pf2e.feats-srd.Item.rByA8NDI6ZtNgBeT',
        effect: 'Compendium.pf2e.feat-effects.Item.NWOmJ6WJFheaGhho',
    },
    {
        // Monastic Archer Stance
        feat: 'Compendium.pf2e.feats-srd.Item.YG2RxXE9SMfwo6wP',
        effect: 'Compendium.pf2e.feat-effects.Item.1dxD3xsTzak6GNj5',
    },
    {
        // Mountain Stance
        feat: 'Compendium.pf2e.feats-srd.Item.ZL5UU9quCTvcWzfY',
        effect: 'Compendium.pf2e.feat-effects.Item.gYpy9XBPScIlY93p',
    },
    {
        // Multishot Stance
        feat: 'Compendium.pf2e.feats-srd.Item.RzhnxgiAopWILCvs',
        effect: 'Compendium.pf2e.feat-effects.Item.l4QUaedYofnfXig0',
    },
    {
        // Paragon's Guard
        feat: 'Compendium.pf2e.feats-srd.Item.hPDerDCYmag3s0dP',
        effect: 'Compendium.pf2e.feat-effects.Item.6EDoy3OSFZ4L3Vs7',
    },
    {
        // Peafowl Stance
        feat: 'Compendium.pf2e.feats-srd.Item.C3MgEkPNaIhTddbr',
        effect: 'Compendium.pf2e.feat-effects.Item.vjvcccAwdkOLA1Fc',
    },
    {
        // Point-Blank Shot
        feat: 'Compendium.pf2e.feats-srd.Item.Yl2wYv24v5kw95aS',
        effect: 'Compendium.pf2e.feat-effects.Item.9HPxAKpP3WJmICBx',
    },
    {
        // Powder Punch Stance
        feat: 'Compendium.pf2e.feats-srd.Item.Ziky4XVV7syXVbUg',
        effect: 'Compendium.pf2e.feat-effects.Item.kDTiRg9vVOYNnTyr',
    },
    {
        // Push Back the Dead!
        feat: 'Compendium.pf2e.feats-srd.Item.BtZJJClWCpc31Ven',
        effect: 'Compendium.pf2e.feat-effects.Item.OeZ0E1oUKyGPxPy0',
    },
    {
        // Rain of Embers Stance
        feat: 'Compendium.pf2e.feats-srd.Item.rbiMK71SvGZGRLJ1',
        effect: 'Compendium.pf2e.feat-effects.Item.Im5JBInybWFbHEYS',
    },
    {
        // Reflective Ripple Stance
        feat: 'Compendium.pf2e.feats-srd.Item.knZUN4sYExIyRC4F',
        effect: 'Compendium.pf2e.feat-effects.Item.QDQwHxNowRwzUx9R',
    },
    {
        // Ricochet Stance (Fighter)
        feat: 'Compendium.pf2e.feats-srd.Item.tRHjUCl0xqG97nok',
        effect: 'Compendium.pf2e.feat-effects.Item.Unfl4QQURWaX2zfd',
    },
    {
        // Ricochet Stance (Rogue)
        feat: 'Compendium.pf2e.feats-srd.Item.RsNvCSrCN7czHC0G',
        effect: 'Compendium.pf2e.feat-effects.Item.Unfl4QQURWaX2zfd',
    },
    {
        // Rough Terrain Stance
        feat: 'Compendium.pf2e.feats-srd.Item.O0POcPD2aELYTcIK',
        effect: 'Compendium.pf2e.feat-effects.Item.YkiTA74FrUUu5IvI',
    },
    {
        // Shooting Stars Stance
        feat: 'Compendium.pf2e.feats-srd.Item.6cQSPqXoAO6oJl0i',
        effect: 'Compendium.pf2e.feat-effects.Item.RXbfq6oqzVnW6xOV',
    },
    {
        // Six Pillars Stance
        feat: 'Compendium.pf2e.feats-srd.Item.hT0pVPqFuiEsmRb8',
        effect: 'Compendium.pf2e.feat-effects.Item.P80mwvCAEncR2snK',
    },
    {
        // Sky and Heaven Stance
        feat: 'Compendium.pf2e.feats-srd.Item.UjEeHamC2C8JfgJz',
        effect: 'Compendium.pf2e.feat-effects.Item.CQfkyJkRHw4IHWhv',
    },
    {
        // Stoked Flame Stance
        feat: 'Compendium.pf2e.feats-srd.Item.GuEdTz1VMEptQnOd',
        effect: 'Compendium.pf2e.feat-effects.Item.rp1YauUSULuqW8rs',
    },
    {
        // Stumbling Stance
        feat: 'Compendium.pf2e.feats-srd.Item.7FRYyKXDKjGoANYj',
        effect: 'Compendium.pf2e.feat-effects.Item.BCyGDKcplkJiSAKJ',
    },
    {
        // Tangled Forest Stance
        feat: 'Compendium.pf2e.feats-srd.Item.2tUdsoPEnW9yS8so',
        effect: 'Compendium.pf2e.feat-effects.Item.PMHwCrnh9W4sMu5b',
    },
    {
        // Tiger Stance
        feat: 'Compendium.pf2e.feats-srd.Item.VCjAlOvjNvFJOsG5',
        effect: 'Compendium.pf2e.feat-effects.Item.pf9yvKNg6jZLrE30',
    },
    {
        // Twinned Defense (Fighter)
        feat: 'Compendium.pf2e.feats-srd.Item.xjLbabfyQzBNT4y1',
        effect: 'Compendium.pf2e.feat-effects.Item.3eHMqVx30JGiJqtM',
    },
    {
        // Twinned Defense (Swashbuckler)
        feat: 'Compendium.pf2e.feats-srd.Item.kTRGAST9J9ZxJZ4A',
        effect: 'Compendium.pf2e.feat-effects.Item.3eHMqVx30JGiJqtM',
    },
    {
        // Vitality-Manipulating Stance
        feat: 'Compendium.pf2e.feats-srd.Item.Tj79ePSD212EZjRM',
        effect: 'Compendium.pf2e.feat-effects.Item.h45sUZFs5jhuQdCE',
    },
    {
        // Whirling Blade Stance
        feat: 'Compendium.pf2e.feats-srd.Item.IaiEZaA8erufMUCr',
        effect: 'Compendium.pf2e.feat-effects.Item.JefXqvhzUeBArkAP',
    },
    {
        //  Whirlwind Stance
        feat: 'Compendium.pf2e.feats-srd.Item.wZZyasfIqwiJBQAQ',
        effect: 'Compendium.pf2e.feat-effects.Item.q6UokHWSEcEYWmvh',
    },
    {
        // Wolf Stance
        feat: 'Compendium.pf2e.feats-srd.Item.AN9jY1JVcU20Qdw6',
        effect: 'Compendium.pf2e.feat-effects.Item.b2kWJuCPj1rDMdwz',
    },
]

const FEATS: Map<ItemUUID, StanceData> = new Map()
const EFFECTS: Set<ItemUUID> = new Set()
const ACTIONS: Set<ItemUUID> = new Set()

export function getActionsUUIDS() {
    return new Set(ACTIONS)
}

export function parseCustomStances() {
    FEATS.clear()
    EFFECTS.clear()
    ACTIONS.clear()

    for (const stance of STANCES) {
        FEATS.set(stance.feat, stance)
        EFFECTS.add(stance.effect)
        ACTIONS.add(stance.action ?? stance.feat)
    }

    try {
        const setting = getSetting<string>('custom').trim()
        if (!setting) return

        const customs = JSON.parse(setting)

        for (const stance of customs) {
            if (typeof stance !== 'object' || Array.isArray(stance)) continue
            if (typeof stance.feat !== 'string' || stance.feat.length < 21) continue
            if (typeof stance.effect !== 'string' || stance.feat.length < 21) continue
            if (FEATS.has(stance.feat) || EFFECTS.has(stance.effect)) continue

            FEATS.set(stance.feat, stance)
            EFFECTS.add(stance.effect)
        }
    } catch (err) {
        error('settings.custom.error')
        console.error(err)
    }
}

export function getStances(actor: CharacterPF2e) {
    const stances: StanceData[] = []
    const replaced: ItemUUID[] = []
    const effects: Map<ItemUUID, string> = new Map()

    for (const feat of actor.itemTypes.feat) {
        const sourceId = feat.sourceId
        const stance = sourceId && FEATS.get(sourceId)
        if (!stance) continue

        stances.push(stance)
        if (stance.replace) replaced.push(stance.replace)
    }

    for (const effect of actor.itemTypes.effect) {
        const sourceId = getSourceId(effect)
        if (!sourceId || !EFFECTS.has(sourceId)) continue
        effects.set(sourceId, effect.id)
    }

    const filtered = stances.filter(stance => !replaced.includes(stance.feat))

    return filtered
        .map(stance => {
            const feat = fromUuidSync<CompendiumIndexData>(stance.feat)
            const effect = fromUuidSync<CompendiumIndexData>(stance.effect)
            const replace = stance.replace && fromUuidSync<CompendiumIndexData>(stance.replace)
            if (!feat || !effect) return

            const returned: ReturnedStance = {
                name: replace ? replace.name : feat.name,
                img: effect.img,
                effectID: effects.get(stance.effect) ?? '',
                effectUUID: stance.effect,
            }

            return returned
        })
        .filter(stance => stance) as ReturnedStance[]
}

export function getEffects(actor: CharacterPF2e) {
    const effects = []

    for (const effect of actor.itemTypes.effect) {
        const sourceId = getSourceId(effect)
        if (!sourceId || !EFFECTS.has(sourceId)) continue
        effects.push({ uuid: sourceId, id: effect.id })
    }

    return effects
}

export async function addStance(actor: CharacterPF2e, uuid: ItemUUID) {
    const effect = await fromUuid<EffectPF2e>(uuid)

    if (effect) {
        const obj = effect.toObject()
        if (!getProperty(obj, 'flags.core.sourceId')) setProperty(obj, 'flags.core.sourceId', effect.uuid)

        const items = (await actor.createEmbeddedDocuments('Item', [obj])) as EffectPF2e[]
        items[0]?.toMessage()

        return true
    }

    return false
}

export async function toggleStance(actor: CharacterPF2e, effectUUID: ItemUUID) {
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
