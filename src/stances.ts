import { getSourceId } from '@utils/foundry/flags'
import { getSetting } from '@utils/foundry/settings'
import { error } from '../../../../../foundryVTT-projects/@utils/foundry/notification'

const STANCES: StanceData[] = [
    {
        // Arcane Cascade
        feat: 'Compendium.pf2e.classfeatures.09iL38CZZEa0q0Mt',
        effect: 'Compendium.pf2e.feat-effects.fsjO5oTKttsbpaKl',
    },
    {
        // Buckler Dance
        feat: 'Compendium.pf2e.feats-srd.tDWc2LQNl0Op1Auq',
        effect: 'Compendium.pf2e.feat-effects.PS17dsXkTdQmOv7w',
    },
    {
        // Bullet Dancer Stance
        feat: 'Compendium.pf2e.feats-srd.j1hhTLOq7o80XCyV',
        effect: 'Compendium.pf2e.feat-effects.6ctQFQfSZ6o1uyyZ',
    },
    {
        // Cobra Stance
        feat: 'Compendium.pf2e.feats-srd.AkV4Jyllo6nlK2Sl',
        effect: 'Compendium.pf2e.feat-effects.CgxYa0lrLUjS2ZhI',
    },
    {
        // Cobra Stance (Envenom)
        feat: 'Compendium.pf2e.feats-srd.xQuNswWB3eg1UM28',
        effect: 'Compendium.pf2e.feat-effects.2Qpt0CHuOMeL48rN',
        replace: 'Compendium.pf2e.feats-srd.AkV4Jyllo6nlK2Sl', // Cobra Stance
    },
    {
        // Crane Stance
        feat: 'Compendium.pf2e.feats-srd.bf7NCeKqDClaqhTR',
        effect: 'Compendium.pf2e.feat-effects.nwkYZs6YwXYAJ4ps',
    },
    {
        // Disarm Stance
        feat: 'Compendium.pf2e.feats-srd.1p5ErCp33nGOzEsk',
        effect: 'Compendium.pf2e.feat-effects.LxSev4GNKv26DbZw',
    },
    {
        // Disruptive Stance
        feat: 'Compendium.pf2e.feats-srd.OEGhbRgW6wRbccns',
        effect: 'Compendium.pf2e.feat-effects.qBR3kqGCeKp3T2Be',
    },
    {
        // Dragon Stance
        feat: 'Compendium.pf2e.feats-srd.8sy3sHwOHS4ImwvJ',
        effect: 'Compendium.pf2e.feat-effects.qUowHpn79Dpt1hVn',
    },
    {
        // Dread Marshal Stance
        feat: 'Compendium.pf2e.feats-srd.R7c4PyTNkZb0yvoT',
        effect: 'Compendium.pf2e.feat-effects.KBEJVRrie2JTHWIK',
    },
    {
        // Dueling Dance (Fighter)
        feat: 'Compendium.pf2e.feats-srd.FYz5eQeTox9IDkSd',
        effect: 'Compendium.pf2e.feat-effects.KiuBRoMFxL2Npt51',
    },
    {
        // Dueling Dance (Swashbuckler)
        feat: 'Compendium.pf2e.feats-srd.9VGmE7X4aK2W8YWj',
        effect: 'Compendium.pf2e.feat-effects.KiuBRoMFxL2Npt51',
    },
    {
        // Everstand Stance
        feat: 'Compendium.pf2e.feats-srd.6GN1zh3RcnZhrzxP',
        effect: 'Compendium.pf2e.feat-effects.GGebXpRPyONZB3eS',
    },
    {
        // Fane's Fourberie
        feat: 'Compendium.pf2e.feats-srd.80CEAB05TP5ki9iW',
        effect: 'Compendium.pf2e.feat-effects.GvqB4M8LrHpzYEvl',
    },
    {
        // Gorilla Stance
        feat: 'Compendium.pf2e.feats-srd.DqD7htz8Sd1dh3BT',
        effect: 'Compendium.pf2e.feat-effects.RozqjLocahvQWERr',
    },
    {
        // Gorilla Stance (Pound)
        feat: 'Compendium.pf2e.feats-srd.nRjyyDulHnP5OewA',
        effect: 'Compendium.pf2e.feat-effects.UZKIKLuwpQu47feK',
        replace: 'Compendium.pf2e.feats-srd.DqD7htz8Sd1dh3BT',
    },
    {
        // Graceful Poise
        feat: 'Compendium.pf2e.feats-srd.rFaUJtB46scuAidY',
        effect: 'Compendium.pf2e.feat-effects.mark4VEQoynfYNBF',
    },
    {
        // Impassable Wall Stance
        feat: 'Compendium.pf2e.feats-srd.YeyOqNFKaeuOTiJr',
        effect: 'Compendium.pf2e.feat-effects.zzC2qZwEKf4Ja3xD',
    },
    {
        // Inspiring Marshal Stance
        feat: 'Compendium.pf2e.feats-srd.bvOsJNeI0ewvQsFa',
        effect: 'Compendium.pf2e.feat-effects.kzEPq4aczYb6OD2h',
    },
    {
        // Ironblood Stance
        feat: 'Compendium.pf2e.feats-srd.x9cYkB8DrUBBwqJd',
        effect: 'Compendium.pf2e.feat-effects.tPKXLtDJ3bzJcXlv',
    },
    {
        // Jellyfish Stance
        feat: 'Compendium.pf2e.feats-srd.Jwq5o13uZF3ooln1',
        effect: 'Compendium.pf2e.feat-effects.pkcr9w5x6bKzl3om',
    },
    {
        // Lunging Stance
        feat: 'Compendium.pf2e.feats-srd.ZghzLmYgeE19GqjP',
        effect: 'Compendium.pf2e.feat-effects.W8CKuADdbODpBh6O',
    },
    {
        // Masquerade of Seasons Stance
        feat: 'Compendium.pf2e.feats-srd.KMVXUgFArcftg1jQ',
        effect: 'Compendium.pf2e.feat-effects.6IsZQpwRJQWIzdGx',
    },
    {
        // Mobile Shot Stance
        feat: 'Compendium.pf2e.feats-srd.rByA8NDI6ZtNgBeT',
        effect: 'Compendium.pf2e.feat-effects.NWOmJ6WJFheaGhho',
    },
    {
        // Monastic Archer Stance
        feat: 'Compendium.pf2e.feats-srd.YG2RxXE9SMfwo6wP',
        effect: 'Compendium.pf2e.feat-effects.1dxD3xsTzak6GNj5',
    },
    {
        // Mountain Stance
        feat: 'Compendium.pf2e.feats-srd.ZL5UU9quCTvcWzfY',
        effect: 'Compendium.pf2e.feat-effects.gYpy9XBPScIlY93p',
    },
    {
        // Multishot Stance
        feat: 'Compendium.pf2e.feats-srd.RzhnxgiAopWILCvs',
        effect: 'Compendium.pf2e.feat-effects.l4QUaedYofnfXig0',
    },
    {
        // Paragon's Guard
        feat: 'Compendium.pf2e.feats-srd.hPDerDCYmag3s0dP',
        effect: 'Compendium.pf2e.feat-effects.6EDoy3OSFZ4L3Vs7',
    },
    {
        // Peafowl Stance
        feat: 'Compendium.pf2e.feats-srd.C3MgEkPNaIhTddbr',
        effect: 'Compendium.pf2e.feat-effects.vjvcccAwdkOLA1Fc',
    },
    {
        // Point-Blank Shot
        feat: 'Compendium.pf2e.feats-srd.Yl2wYv24v5kw95aS',
        effect: 'Compendium.pf2e.feat-effects.9HPxAKpP3WJmICBx',
    },
    {
        // Powder Punch Stance
        feat: 'Compendium.pf2e.feats-srd.Ziky4XVV7syXVbUg',
        effect: 'Compendium.pf2e.feat-effects.kDTiRg9vVOYNnTyr',
    },
    {
        // Push Back the Dead!
        feat: 'Compendium.pf2e.feats-srd.BtZJJClWCpc31Ven',
        effect: 'Compendium.pf2e.feat-effects.OeZ0E1oUKyGPxPy0',
    },
    {
        // Rain of Embers Stance
        feat: 'Compendium.pf2e.feats-srd.rbiMK71SvGZGRLJ1',
        effect: 'Compendium.pf2e.feat-effects.Im5JBInybWFbHEYS',
    },
    {
        // Reflective Ripple Stance
        feat: 'Compendium.pf2e.feats-srd.knZUN4sYExIyRC4F',
        effect: 'Compendium.pf2e.feat-effects.QDQwHxNowRwzUx9R',
    },
    {
        // Ricochet Stance (Fighter)
        feat: 'Compendium.pf2e.feats-srd.tRHjUCl0xqG97nok',
        effect: 'Compendium.pf2e.feat-effects.Unfl4QQURWaX2zfd',
    },
    {
        // Ricochet Stance (Rogue)
        feat: 'Compendium.pf2e.feats-srd.RsNvCSrCN7czHC0G',
        effect: 'Compendium.pf2e.feat-effects.Unfl4QQURWaX2zfd',
    },
    {
        // Rough Terrain Stance
        feat: 'Compendium.pf2e.feats-srd.O0POcPD2aELYTcIK',
        effect: 'Compendium.pf2e.feat-effects.YkiTA74FrUUu5IvI',
    },
    {
        // Shooting Stars Stance
        feat: 'Compendium.pf2e.feats-srd.6cQSPqXoAO6oJl0i',
        effect: 'Compendium.pf2e.feat-effects.RXbfq6oqzVnW6xOV',
    },
    {
        // Six Pillars Stance
        feat: 'Compendium.pf2e.feats-srd.hT0pVPqFuiEsmRb8',
        effect: 'Compendium.pf2e.feat-effects.P80mwvCAEncR2snK',
    },
    {
        // Sky and Heaven Stance
        feat: 'Compendium.pf2e.feats-srd.UjEeHamC2C8JfgJz',
        effect: 'Compendium.pf2e.feat-effects.CQfkyJkRHw4IHWhv',
    },
    {
        // Stoked Flame Stance
        feat: 'Compendium.pf2e.feats-srd.GuEdTz1VMEptQnOd',
        effect: 'Compendium.pf2e.feat-effects.rp1YauUSULuqW8rs',
    },
    {
        // Stumbling Stance
        feat: 'Compendium.pf2e.feats-srd.7FRYyKXDKjGoANYj',
        effect: 'Compendium.pf2e.feat-effects.BCyGDKcplkJiSAKJ',
    },
    {
        // Tangled Forest Stance
        feat: 'Compendium.pf2e.feats-srd.2tUdsoPEnW9yS8so',
        effect: 'Compendium.pf2e.feat-effects.PMHwCrnh9W4sMu5b',
    },
    {
        // Tiger Stance
        feat: 'Compendium.pf2e.feats-srd.VCjAlOvjNvFJOsG5',
        effect: 'Compendium.pf2e.feat-effects.pf9yvKNg6jZLrE30',
    },
    {
        // Twinned Defense (Fighter)
        feat: 'Compendium.pf2e.feats-srd.xjLbabfyQzBNT4y1',
        effect: 'Compendium.pf2e.feat-effects.3eHMqVx30JGiJqtM',
    },
    {
        // Twinned Defense (Swashbuckler)
        feat: 'Compendium.pf2e.feats-srd.kTRGAST9J9ZxJZ4A',
        effect: 'Compendium.pf2e.feat-effects.3eHMqVx30JGiJqtM',
    },
    {
        // Vitality-Manipulating Stance
        feat: 'Compendium.pf2e.feats-srd.Tj79ePSD212EZjRM',
        effect: 'Compendium.pf2e.feat-effects.h45sUZFs5jhuQdCE',
    },
    {
        // Whirling Blade Stance
        feat: 'Compendium.pf2e.feats-srd.IaiEZaA8erufMUCr',
        effect: 'Compendium.pf2e.feat-effects.JefXqvhzUeBArkAP',
    },
    {
        //  Whirlwind Stance
        feat: 'Compendium.pf2e.feats-srd.wZZyasfIqwiJBQAQ',
        effect: 'Compendium.pf2e.feat-effects.q6UokHWSEcEYWmvh',
    },
    {
        // Wolf Stance
        feat: 'Compendium.pf2e.feats-srd.AN9jY1JVcU20Qdw6',
        effect: 'Compendium.pf2e.feat-effects.b2kWJuCPj1rDMdwz',
    },
]

const FEATS: Map<ItemUUID, StanceData> = new Map()
const EFFECTS: Set<ItemUUID> = new Set()

export function parseCustomStances() {
    FEATS.clear()
    EFFECTS.clear()

    for (const stance of STANCES) {
        FEATS.set(stance.feat, stance)
        EFFECTS.add(stance.effect)
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
        const sourceId = getSourceId(feat)
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
