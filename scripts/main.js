/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sheet.ts":
/*!**********************!*\
  !*** ./src/sheet.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "refreshCharacterSheets": () => (/* binding */ refreshCharacterSheets),
/* harmony export */   "renderCharacterSheetPF2e": () => (/* binding */ renderCharacterSheetPF2e)
/* harmony export */ });
/* harmony import */ var _utils_foundry_localize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utils/foundry/localize */ "../../../../foundryVTT-projects/@utils/foundry/localize.ts");
/* harmony import */ var _utils_foundry_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/foundry/path */ "../../../../foundryVTT-projects/@utils/foundry/path.ts");
/* harmony import */ var _stances__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stances */ "./src/stances.ts");



async function renderCharacterSheetPF2e(sheet, html) {
    const actor = sheet.actor;
    await addStances(actor, html);
    html.find('.sheet-body .sheet-content [data-tab=actions] .tab-content .actions-panels [data-tab=encounter] .pf2e-stances .pf2e-stances__stance').on('click', event => onToggleStance(event, actor));
}
function refreshCharacterSheets(actor) {
    for (const win of Object.values(ui.windows)) {
        if (!(win instanceof ActorSheet))
            continue;
        if (actor === win.actor)
            win.render();
    }
}
async function onToggleStance(event, actor) {
    const target = event.currentTarget;
    const canUseStances = target.closest('.pf2e-stances')?.classList.contains('can-use-stances');
    if (!event.ctrlKey && !canUseStances)
        return;
    const effectUUID = target.dataset.effectUuid;
    const effects = (0,_stances__WEBPACK_IMPORTED_MODULE_2__.getEffects)(actor);
    const already = effects.findIndex(effect => effect.uuid === effectUUID);
    let create = false;
    if (already < 0) {
        create = true;
    }
    else if (effects.length) {
        const other = effects.filter(effect => effect.uuid !== effectUUID).length;
        const more = effects.filter(effect => effect.uuid === effectUUID).length > 1;
        if (other || more)
            effects.splice(already, 1);
    }
    if (effects.length) {
        await actor.deleteEmbeddedDocuments('Item', effects.map(x => x.id));
    }
    if (create) {
        const effect = await fromUuid(effectUUID);
        if (effect) {
            const items = (await actor.createEmbeddedDocuments('Item', [effect.toObject()]));
            items[0]?.toMessage();
        }
    }
}
async function addStances(actor, html) {
    const stances = (0,_stances__WEBPACK_IMPORTED_MODULE_2__.getStances)(actor).sort((a, b) => a.name.localeCompare(b.name));
    if (!stances.length)
        return;
    const inCombat = actor.getActiveTokens(true, true).some(token => token.inCombat);
    const options = html.find('.sheet-body .sheet-content [data-tab=actions] .tab-content .actions-panels [data-tab=encounter] .actions-options');
    const template = await renderTemplate((0,_utils_foundry_path__WEBPACK_IMPORTED_MODULE_1__.templatePath)('stances.hbs'), {
        stances,
        canUseStances: inCombat && !actor.isDead,
        i18n: _utils_foundry_localize__WEBPACK_IMPORTED_MODULE_0__.localize,
    });
    options.after(template);
}


/***/ }),

/***/ "./src/stances.ts":
/*!************************!*\
  !*** ./src/stances.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getEffects": () => (/* binding */ getEffects),
/* harmony export */   "getStances": () => (/* binding */ getStances)
/* harmony export */ });
/* harmony import */ var _utils_foundry_flags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utils/foundry/flags */ "../../../../foundryVTT-projects/@utils/foundry/flags.ts");

const STANCES = [
    {
        // Buckler Dance
        feat: 'Compendium.pf2e.feats-srd.tDWc2LQNl0Op1Auq',
        effect: 'Compendium.pf2e-stances.effects.PS17dsXkTdQmOv7w',
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
        effect: 'Compendium.pf2e-stances.effects.qBR3kqGCeKp3T2Be',
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
        effect: 'Compendium.pf2e-stances.effects.GvqB4M8LrHpzYEvl',
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
        effect: 'Compendium.pf2e-stances.effects.mark4VEQoynfYNBF',
    },
    {
        // Impassable Wall Stance
        feat: 'Compendium.pf2e.feats-srd.YeyOqNFKaeuOTiJr',
        effect: 'Compendium.pf2e-stances.effects.zzC2qZwEKf4Ja3xD',
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
        effect: 'Compendium.pf2e-stances.effects.W8CKuADdbODpBh6O',
    },
    {
        // Masquerade of Seasons Stance
        feat: 'Compendium.pf2e.feats-srd.KMVXUgFArcftg1jQ',
        effect: 'Compendium.pf2e.feat-effects.6IsZQpwRJQWIzdGx',
    },
    {
        // Mobile Shot Stance
        feat: 'Compendium.pf2e.feats-srd.rByA8NDI6ZtNgBeT',
        effect: 'Compendium.pf2e-stances.effects.NWOmJ6WJFheaGhho',
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
        effect: 'Compendium.pf2e-stances.effects.kDTiRg9vVOYNnTyr',
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
        effect: 'Compendium.pf2e-stances.effects.Unfl4QQURWaX2zfd',
    },
    {
        // Ricochet Stance (Rogue)
        feat: 'Compendium.pf2e.feats-srd.RsNvCSrCN7czHC0G',
        effect: 'Compendium.pf2e-stances.effects.Unfl4QQURWaX2zfd',
    },
    {
        // Rough Terrain Stance
        feat: 'Compendium.pf2e.feats-srd.O0POcPD2aELYTcIK',
        effect: 'Compendium.pf2e-stances.effects.YkiTA74FrUUu5IvI',
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
        effect: 'Compendium.pf2e-stances.effects.3eHMqVx30JGiJqtM',
    },
    {
        // Twinned Defense (Swashbuckler)
        feat: 'Compendium.pf2e.feats-srd.kTRGAST9J9ZxJZ4A',
        effect: 'Compendium.pf2e-stances.effects.3eHMqVx30JGiJqtM',
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
        effect: 'Compendium.pf2e-stances.effects.q6UokHWSEcEYWmvh',
    },
    {
        // Wolf Stance
        feat: 'Compendium.pf2e.feats-srd.AN9jY1JVcU20Qdw6',
        effect: 'Compendium.pf2e.feat-effects.b2kWJuCPj1rDMdwz',
    },
];
const FEATS = new Map(STANCES.map(stance => [stance.feat, stance]));
const EFFECTS = new Map(STANCES.map(stance => [stance.effect, stance]));
function getStances(actor) {
    const stances = [];
    const replaced = [];
    const effects = new Map();
    for (const feat of actor.itemTypes.feat) {
        const sourceId = (0,_utils_foundry_flags__WEBPACK_IMPORTED_MODULE_0__.getSourceId)(feat);
        const stance = sourceId && FEATS.get(sourceId);
        if (!stance)
            continue;
        stances.push(stance);
        if (stance.replace)
            replaced.push(stance.replace);
    }
    for (const effect of actor.itemTypes.effect) {
        const sourceId = (0,_utils_foundry_flags__WEBPACK_IMPORTED_MODULE_0__.getSourceId)(effect);
        if (!sourceId || !EFFECTS.has(sourceId))
            continue;
        effects.set(sourceId, effect.id);
    }
    const filtered = stances.filter(stance => !replaced.includes(stance.feat));
    return filtered
        .map(stance => {
        const feat = fromUuidSync(stance.feat);
        const effect = fromUuidSync(stance.effect);
        const replace = stance.replace && fromUuidSync(stance.replace);
        if (!feat || !effect)
            return;
        const returned = {
            name: replace ? replace.name : feat.name,
            img: effect.img,
            effectID: effects.get(stance.effect) ?? '',
            effectUUID: stance.effect,
        };
        return returned;
    })
        .filter(stance => stance);
}
function getEffects(actor) {
    const effects = [];
    for (const effect of actor.itemTypes.effect) {
        const sourceId = (0,_utils_foundry_flags__WEBPACK_IMPORTED_MODULE_0__.getSourceId)(effect);
        if (!sourceId || !EFFECTS.has(sourceId))
            continue;
        effects.push({ uuid: sourceId, id: effect.id });
    }
    return effects;
}


/***/ }),

/***/ "../../../../foundryVTT-projects/@utils/foundry/flags.ts":
/*!***************************************************************!*\
  !*** ../../../../foundryVTT-projects/@utils/foundry/flags.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "flagPath": () => (/* binding */ flagPath),
/* harmony export */   "getFlag": () => (/* binding */ getFlag),
/* harmony export */   "getSourceId": () => (/* binding */ getSourceId),
/* harmony export */   "hasModuleFlag": () => (/* binding */ hasModuleFlag),
/* harmony export */   "hasSourceId": () => (/* binding */ hasSourceId),
/* harmony export */   "includesSourceId": () => (/* binding */ includesSourceId),
/* harmony export */   "setFlag": () => (/* binding */ setFlag)
/* harmony export */ });
/* harmony import */ var _utils_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utils/module */ "../../../../foundryVTT-projects/@utils/module.ts");

function hasModuleFlag(doc) {
    return getProperty(doc, `flags.${_utils_module__WEBPACK_IMPORTED_MODULE_0__.MODULE_ID}`) !== undefined;
}
function flagPath(key) {
    return `flags.${_utils_module__WEBPACK_IMPORTED_MODULE_0__.MODULE_ID}.key`;
}
function getFlag(doc, key, fallback) {
    return doc.getFlag(_utils_module__WEBPACK_IMPORTED_MODULE_0__.MODULE_ID, key) ?? fallback;
}
/**
 * @template {foundry.Document} T
 * @param {T} doc
 * @param {string} key
 * @param {any} value
 * @returns T
 */
function setFlag(doc, key, value) {
    return doc.setFlag(_utils_module__WEBPACK_IMPORTED_MODULE_0__.MODULE_ID, key, value);
}
function getSourceId(doc) {
    return doc.getFlag('core', 'sourceId');
}
function hasSourceId(doc, sourceId) {
    return getSourceId(doc) === sourceId;
}
function includesSourceId(doc, list) {
    const sourceId = getSourceId(doc);
    return sourceId ? list.includes(sourceId) : false;
}


/***/ }),

/***/ "../../../../foundryVTT-projects/@utils/foundry/localize.ts":
/*!******************************************************************!*\
  !*** ../../../../foundryVTT-projects/@utils/foundry/localize.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasLocalization": () => (/* binding */ hasLocalization),
/* harmony export */   "localize": () => (/* binding */ localize),
/* harmony export */   "localizePath": () => (/* binding */ localizePath),
/* harmony export */   "subLocalize": () => (/* binding */ subLocalize)
/* harmony export */ });
/* harmony import */ var _utils_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utils/module */ "../../../../foundryVTT-projects/@utils/module.ts");
/* harmony import */ var _utils_foundry_notification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/foundry/notification */ "../../../../foundryVTT-projects/@utils/foundry/notification.ts");


function localize(...args) {
    let [key, data] = args;
    key = `${_utils_module__WEBPACK_IMPORTED_MODULE_0__.MODULE_ID}.${key}`;
    if (data)
        return game.i18n.format(key, data);
    return game.i18n.localize(key);
}
function hasLocalization(key) {
    return game.i18n.has(`${_utils_module__WEBPACK_IMPORTED_MODULE_0__.MODULE_ID}.${key}`, false);
}
function localizePath(key) {
    return `${_utils_module__WEBPACK_IMPORTED_MODULE_0__.MODULE_ID}.${key}`;
}
function subLocalize(subKey) {
    const fn = (...args) => localize(`${subKey}.${args[0]}`, args[1]);
    Object.defineProperties(fn, {
        warn: {
            value: (...args) => (0,_utils_foundry_notification__WEBPACK_IMPORTED_MODULE_1__.warn)(`${subKey}.${args[0]}`, args[1], args[2]),
            enumerable: false,
            configurable: false,
        },
        info: {
            value: (...args) => (0,_utils_foundry_notification__WEBPACK_IMPORTED_MODULE_1__.info)(`${subKey}.${args[0]}`, args[1], args[2]),
            enumerable: false,
            configurable: false,
        },
        error: {
            value: (...args) => (0,_utils_foundry_notification__WEBPACK_IMPORTED_MODULE_1__.error)(`${subKey}.${args[0]}`, args[1], args[2]),
            enumerable: false,
            configurable: false,
        },
        has: {
            value: (key) => hasLocalization(`${subKey}.${key}`),
            enumerable: false,
            configurable: false,
        },
        path: {
            value: (key) => localizePath(`${subKey}.${key}`),
            enumerable: false,
            configurable: false,
        },
    });
    return fn;
}


/***/ }),

/***/ "../../../../foundryVTT-projects/@utils/foundry/notification.ts":
/*!**********************************************************************!*\
  !*** ../../../../foundryVTT-projects/@utils/foundry/notification.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "error": () => (/* binding */ error),
/* harmony export */   "info": () => (/* binding */ info),
/* harmony export */   "warn": () => (/* binding */ warn)
/* harmony export */ });
/* harmony import */ var _utils_foundry_localize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utils/foundry/localize */ "../../../../foundryVTT-projects/@utils/foundry/localize.ts");

function notify(str, arg1, arg2, arg3) {
    const type = typeof arg1 === 'string' ? arg1 : 'info';
    const data = typeof arg1 === 'object' ? arg1 : typeof arg2 === 'object' ? arg2 : undefined;
    const permanent = typeof arg1 === 'boolean' ? arg1 : typeof arg2 === 'boolean' ? arg2 : arg3 ?? false;
    ui.notifications.notify((0,_utils_foundry_localize__WEBPACK_IMPORTED_MODULE_0__.localize)(str, data), type, { permanent });
}
function warn(...args) {
    const [str, arg1, arg2] = args;
    notify(str, 'warning', arg1, arg2);
}
function info(...args) {
    const [str, arg1, arg2] = args;
    notify(str, 'info', arg1, arg2);
}
function error(...args) {
    const [str, arg1, arg2] = args;
    notify(str, 'error', arg1, arg2);
}


/***/ }),

/***/ "../../../../foundryVTT-projects/@utils/foundry/path.ts":
/*!**************************************************************!*\
  !*** ../../../../foundryVTT-projects/@utils/foundry/path.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "flagsUpdatePath": () => (/* binding */ flagsUpdatePath),
/* harmony export */   "getSettingLocalizationPath": () => (/* binding */ getSettingLocalizationPath),
/* harmony export */   "imagePath": () => (/* binding */ imagePath),
/* harmony export */   "templatePath": () => (/* binding */ templatePath)
/* harmony export */ });
/* harmony import */ var _utils_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utils/module */ "../../../../foundryVTT-projects/@utils/module.ts");

function getSettingLocalizationPath(...path) {
    return `${_utils_module__WEBPACK_IMPORTED_MODULE_0__.MODULE_ID}.settings.${path.join('.')}`;
}
function flagsUpdatePath(...path) {
    return `flags.${_utils_module__WEBPACK_IMPORTED_MODULE_0__.MODULE_ID}.${path.join('/')}`;
}
function templatePath(...path) {
    path = path.filter(x => typeof x === 'string');
    return `modules/${_utils_module__WEBPACK_IMPORTED_MODULE_0__.MODULE_ID}/templates/${path.join('/')}`;
}
function imagePath(...path) {
    return `modules/${_utils_module__WEBPACK_IMPORTED_MODULE_0__.MODULE_ID}/images/${path.join('/')}`;
}


/***/ }),

/***/ "../../../../foundryVTT-projects/@utils/module.ts":
/*!********************************************************!*\
  !*** ../../../../foundryVTT-projects/@utils/module.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MODULE_ID": () => (/* binding */ MODULE_ID),
/* harmony export */   "setModuleID": () => (/* binding */ setModuleID)
/* harmony export */ });
let MODULE_ID = '';
function setModuleID(id) {
    if (!MODULE_ID)
        MODULE_ID = id;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MODULE_ID": () => (/* binding */ MODULE_ID)
/* harmony export */ });
/* harmony import */ var _utils_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utils/module */ "../../../../foundryVTT-projects/@utils/module.ts");
/* harmony import */ var _sheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sheet */ "./src/sheet.ts");
/* harmony import */ var _stances__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stances */ "./src/stances.ts");



const MODULE_ID = 'pf2e-stances';
(0,_utils_module__WEBPACK_IMPORTED_MODULE_0__.setModuleID)(MODULE_ID);
Hooks.on('deleteCombatant', deleteCombatant);
Hooks.on('createCombatant', createCombatant);
Hooks.on('deleteCombat', deleteCombat);
Hooks.on('renderCharacterSheetPF2e', _sheet__WEBPACK_IMPORTED_MODULE_1__.renderCharacterSheetPF2e);
function deleteCombat(combat) {
    for (const combatant of combat.combatants) {
        deleteCombatant(combatant);
    }
}
function deleteCombatant(combatant) {
    const actor = getActorFromCombatant(combatant);
    if (!actor)
        return;
    const effects = (0,_stances__WEBPACK_IMPORTED_MODULE_2__.getEffects)(actor).map(effect => effect.id);
    if (effects.length)
        actor.deleteEmbeddedDocuments('Item', effects);
    else
        (0,_sheet__WEBPACK_IMPORTED_MODULE_1__.refreshCharacterSheets)(actor);
}
function createCombatant(combatant) {
    const actor = getActorFromCombatant(combatant);
    if (actor)
        (0,_sheet__WEBPACK_IMPORTED_MODULE_1__.refreshCharacterSheets)(actor);
}
function getActorFromCombatant(combatant) {
    const actor = combatant.actor;
    if (!actor || actor.isToken || !actor.isOfType('character'))
        return;
    else
        return actor;
}

})();

/******/ })()
;
//# sourceMappingURL=main.js.map