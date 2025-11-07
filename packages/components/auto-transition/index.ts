import { withInstall } from '@strive-molu/utils'
import AutoTransition from './src/auto-transition.vue'
import type { SFCWithInstall } from '@strive-molu/utils'

export const SmAutoTransition: SFCWithInstall<typeof AutoTransition> = withInstall(AutoTransition)
export default SmAutoTransition

export * from './src/auto-transition'
export type { AutoTransitionInstance } from './src/instance'
