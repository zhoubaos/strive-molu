import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Cascader from '../src/cascader.vue'

const AXIOM = 'Rem is the best girl'

describe('Cascader.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Cascader>{AXIOM}</Cascader>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
