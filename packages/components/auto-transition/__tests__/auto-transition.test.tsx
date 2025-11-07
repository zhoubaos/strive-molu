import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import AutoTransition from '../src/auto-transition.vue'

const AXIOM = 'Rem is the best girl'

describe('AutoTransition.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <AutoTransition>{AXIOM}</AutoTransition>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
