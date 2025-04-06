import { mount } from '@vue/test-utils';
import { describe, expect, it, test } from 'vitest';

import Button from '../src/button.vue';

describe('Button.vue', () => {
  it('create', () => {
    const wrapper = mount(() => <Button />);

    expect(wrapper.classes()).toContain('sm-button');
  });
});
