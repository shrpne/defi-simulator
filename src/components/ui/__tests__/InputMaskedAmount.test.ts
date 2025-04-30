import { mount, type VueWrapper, type DOMWrapper } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import InputMaskedAmount from '@/components/ui/InputMaskedAmount.vue';


describe('InputMaskedAmount.vue', () => {
    let wrapper: VueWrapper;
    let input: DOMWrapper<HTMLInputElement>;

    beforeEach(() => {
        wrapper = mount(InputMaskedAmount, {
            props: {
                modelValue: '',
            },
        });
        input = wrapper.find('input');
    });

    it('renders properly', () => {
        expect(wrapper.find('input').exists()).toBe(true);
    });

    it('emits update:modelValue event when input changes', async () => {
        // Trigger the 'accept' event that would normally be triggered by imask
        await input.setValue('123.45');

        expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['123.45']);
    });

    it('updates input value when modelValue prop changes', async () => {
        await wrapper.setProps({ modelValue: '42.5' });

        expect(input.element.value).toBe('42.5');
    });

    it('handles props correctly', async () => {
        // Test default scale
        await input.setValue('123.12345678901234567890');
        expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['123.123456789012345678']);

        // Test with a custom scale
        await wrapper.setProps({ scale: 0 });
        await input.setValue('123.456');
        expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['123']);

        // Test with percent mode
        await wrapper.setProps({ isPercent: true, scale: 2 });
        await input.setValue('99.9999');
        expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['99.99']);
        // Check if the percent sign is displayed
        expect(input.element.value).toBe('99.99%');
    });

    it('handles zero value properly', async () => {
        await input.setValue('0');

        expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['0']);
    });

    it('handles very small decimal properly', async () => {
        await input.setValue('0.000001');

        expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['0.000001']);
    });

    it('handles very large number properly', async () => {
        await input.setValue('999999999.999999');

        expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['999999999.999999']);
    });

    it('handles empty string properly', async () => {
        await wrapper.setProps({ modelValue: '' });
        expect(input.element.value).toEqual('');
    });

    it('handles different decimal separators correctly', async () => {
        const testCases = [',', 'ю', 'Ю', 'б', 'Б'];
        for (const separator of testCases) {
            await input.setValue(`123${separator}45`);

            expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['123.45']);
        }
    });

    it('handles percent mode with scale correctly', async () => {
        await wrapper.setProps({ isPercent: true, scale: 2 });
        await input.setValue('99.9999');

        expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['99.99']);
        expect(input.element.value).toBe('99.99%');
    });

    it('handles boundary values correctly', async () => {
        // Test maximum value
        await input.setValue('999999999999999999.999999999999999999');

        expect(wrapper.emitted('update:modelValue').at(-1)[0]).toMatch(/^[0-9]+\.[0-9]+$/);

        // Test minimum value
        await input.setValue('0.000000000000000001');

        expect(wrapper.emitted('update:modelValue').at(-1)[0]).toMatch(/^0\.0+[1-9]$/);
    });
});
