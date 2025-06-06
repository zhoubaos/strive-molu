import { buildProps } from '@strive-molu/utils'

import type { ExtractPropTypes } from 'vue'

export const multipleInputProps = buildProps({} as const)
export type MultipleInputProps = ExtractPropTypes<typeof multipleInputProps>

export const multipleInputEmits = {}
export type MultipleInputEmits = typeof multipleInputEmits
