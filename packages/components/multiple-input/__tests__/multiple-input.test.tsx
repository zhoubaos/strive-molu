import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import MultipleInput from '../src/multiple-input.vue'

const AXIOM = 'Rem is the best girl'

describe('MultipleInput.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <MultipleInput>{AXIOM}</MultipleInput>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
