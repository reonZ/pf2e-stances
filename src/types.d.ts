declare const game: GamePF2e
declare const canvas: CanvasPF2e
declare const ui: UiPF2e
declare const CONFIG: ConfigPF2e

type StanceData = { feat: ItemUUID; effect: ItemUUID; action?: ItemUUID; replace?: ItemUUID }
type ReturnedStance = { name: string; img: string; effectUUID: ItemUUID; effectID: string }
