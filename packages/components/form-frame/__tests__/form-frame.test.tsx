import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import FormFrame from '../src/form-frame.vue'

const AXIOM = 'Rem is the best girl'

describe('FormFrame.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <FormFrame>{AXIOM}</FormFrame>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
