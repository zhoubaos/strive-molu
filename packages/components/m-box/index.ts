import { withInstall } from '@strive-molu/utils'
import MBox from './src/m-box.vue'
import type { SFCWithInstall } from '@strive-molu/utils'

export const SmMBox: SFCWithInstall<typeof MBox> = withInstall(MBox)
export default SmMBox

export * from './src/m-box'
export type { MBoxInstance } from './src/instance'
