import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import MBox from '../src/m-box.vue'

const AXIOM = 'Rem is the best girl'

describe('MBox.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <MBox>{AXIOM}</MBox>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
