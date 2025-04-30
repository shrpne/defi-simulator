import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import FieldCombinedUseMax from '@/components/ui/FieldCombinedUseMax.vue';

describe('FieldCombinedUseMax.vue', () => {
    it('renders button when maxValue is defined and not used', async () => {
        const wrapper = mount(FieldCombinedUseMax, {
            props: { value: '', maxValue: '100' },
        });
        expect(wrapper.find('button').exists()).toBe(true);
        expect(wrapper.text()).toContain('Use max');
    });

    it('does not render button when maxValue is not defined', () => {
        const wrapper = mount(FieldCombinedUseMax, {
            props: { value: '', maxValue: undefined },
        });
        expect(wrapper.find('button').exists()).toBe(false);
    });

    it('does not render button when value equals maxValue', () => {
        const wrapper = mount(FieldCombinedUseMax, {
            props: { value: '100', maxValue: '100' },
        });
        expect(wrapper.find('button').exists()).toBe(false);
    });

    it('emits update:value and use-max when button is clicked', async () => {
        const wrapper = mount(FieldCombinedUseMax, {
            props: { value: '', maxValue: '123.45' },
        });
        await wrapper.find('button').trigger('click');
        expect(wrapper.emitted('update:value')).toBeTruthy();
        expect(wrapper.emitted('use-max')).toBeTruthy();
    });

    it('emits update:is-use-max when isUseMax changes', async () => {
        const wrapper = mount(FieldCombinedUseMax, {
            props: { value: '', maxValue: '50' },
        });
        await wrapper.find('button').trigger('click');
        expect(wrapper.emitted('update:is-use-max')).toBeTruthy();
    });

    it('shows rounded symbol when isDecimal is true and maxValue is rounded', () => {
        const wrapper = mount(FieldCombinedUseMax, {
            props: { value: '', maxValue: '123.1234567890', isDecimal: true },
        });
        expect(wrapper.text()).toMatch(/≈/);
    });

    it('shows rounded symbol when maxValue is rounded', () => {
        const wrapper = mount(FieldCombinedUseMax, {
            props: { value: '', maxValue: '123.1234567890', isDecimal: false },
        });
        expect(wrapper.text()).toMatch(/≈/);
    });

    it('handles watchMaxValue prop', async () => {
        const wrapper = mount(FieldCombinedUseMax, {
            props: { value: '', maxValue: '10', watchMaxValue: true },
        });
        await wrapper.setProps({ maxValue: '20' });
        // Should not throw and should update
        expect(wrapper.props('maxValue')).toBe('20');
    });

    it('handles edge case: maxValue is 0', () => {
        const wrapper = mount(FieldCombinedUseMax, {
            props: { value: '', maxValue: 0 },
        });
        expect(wrapper.find('button').exists()).toBe(false);
    });
});
