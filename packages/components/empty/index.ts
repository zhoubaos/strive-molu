import { withInstall } from '@strive-molu/utils'
import Empty from './src/empty.vue'
import type { SFCWithInstall } from '@strive-molu/utils'

export const SmEmpty: SFCWithInstall<typeof Empty> = withInstall(Empty)
export default SmEmpty

export * from './src/empty'
export type { EmptyInstance } from './src/instance'
