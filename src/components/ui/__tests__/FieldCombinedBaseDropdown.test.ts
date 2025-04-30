import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import FieldCombinedBaseDropdown from '@/components/ui/FieldCombinedBaseDropdown.vue';

describe('FieldCombinedBaseDropdown.vue', () => {
    const defaultProps = {
        isOpen: false,
        options: ['option1', 'option2', 'option3'],
        getDisplayValue: (value: string) => value,
    };

    it('renders when isOpen is true', () => {
        const wrapper = mount(FieldCombinedBaseDropdown, {
            props: {
                ...defaultProps,
                isOpen: true,
            },
        });
        expect(wrapper.find('.h-field__dropdown').isVisible()).toBe(true);
    });

    it('does not render when isOpen is false', () => {
        const wrapper = mount(FieldCombinedBaseDropdown, {
            props: defaultProps,
        });
        expect(wrapper.find('.h-field__dropdown').isVisible()).toBe(false);
    });

    it('filters options based on input value', async () => {
        const wrapper = mount(FieldCombinedBaseDropdown, {
            props: {
                ...defaultProps,
                isOpen: true,
            },
        });

        await wrapper.find('input').setValue('option1');
        const items = wrapper.findAll('.h-field__suggestion-item');
        expect(items).toHaveLength(1);
        expect(items[0].text()).toBe('option1');
    });

    it('uses custom filter function when provided', async () => {
        const customFilter = vi.fn((item, query) => item.includes(query));
        const wrapper = mount(FieldCombinedBaseDropdown, {
            props: {
                ...defaultProps,
                isOpen: true,
                filter: customFilter,
            },
        });

        await wrapper.find('input').setValue('tion');
        expect(customFilter).toHaveBeenCalled();
        const items = wrapper.findAll('.h-field__suggestion-item');
        expect(items).toHaveLength(3); // All options contain "tion"
    });

    it('limits number of displayed options based on maxOptions prop', () => {
        const wrapper = mount(FieldCombinedBaseDropdown, {
            props: {
                ...defaultProps,
                isOpen: true,
                maxOptions: 2,
            },
        });

        const items = wrapper.findAll('.h-field__suggestion-item');
        expect(items).toHaveLength(2);
    });

    it('emits select event when option is clicked', async () => {
        const wrapper = mount(FieldCombinedBaseDropdown, {
            props: {
                ...defaultProps,
                isOpen: true,
            },
        });

        await wrapper.findAll('.h-field__suggestion-item')[0].trigger('click');
        expect(wrapper.emitted('select')).toBeTruthy();
        expect(wrapper.emitted('select')![0]).toEqual(['option1']);
    });

    it('handles keyboard navigation', async () => {
        const wrapper = mount(FieldCombinedBaseDropdown, {
            attachTo: document.body,
            props: {
                ...defaultProps,
                isOpen: true,
            },
        });

        // Initial state
        expect(wrapper.vm.focusedIndex).toBe(0);

        // Simulate arrow down
        await wrapper.trigger('keydown', { code: 'ArrowDown', keyCode: 40 });
        expect(wrapper.vm.focusedIndex).toBe(1);

        // Simulate arrow up
        await wrapper.trigger('keydown', { code: 'ArrowUp', keyCode: 38 });
        expect(wrapper.vm.focusedIndex).toBe(0);
    });

    it('closes dropdown on escape key', async () => {
        const wrapper = mount(FieldCombinedBaseDropdown, {
            attachTo: document.body,
            props: {
                ...defaultProps,
                isOpen: true,
            },
        });

        await wrapper.trigger('keydown', { code: 'Escape', keyCode: 27 });
        expect(wrapper.emitted('update:isOpen')[0]).toEqual([false]);
    });

    it('handles custom display value function', () => {
        const customGetDisplayValue = (value: string) => `Custom ${value}`;
        const wrapper = mount(FieldCombinedBaseDropdown, {
            props: {
                ...defaultProps,
                isOpen: true,
                getDisplayValue: customGetDisplayValue,
            },
        });

        const items = wrapper.findAll('.h-field__suggestion-item');
        expect(items[0].text()).toBe('Custom option1');
    });

    it('handles slots correctly', () => {
        const wrapper = mount(FieldCombinedBaseDropdown, {
            props: {
                ...defaultProps,
                isOpen: true,
            },
            slots: {
                option: `<template #option="{ option }">
                    <span class="custom-option">{{ option }}</span>
                </template>`,
            },
        });

        expect(wrapper.find('.custom-option').exists()).toBe(true);
    });

    it('applies attributes to input element instead of root element', () => {
        const wrapper = mount(FieldCombinedBaseDropdown, {
            props: {
                ...defaultProps,
                isOpen: true,
            },
            attrs: {
                'data-testid': 'test-id',
                'aria-label': 'Custom Input',
                'autocomplete': 'off'
            }
        });

        // Check that attributes are not on the root element
        const rootElement = wrapper.find('.h-field__dropdown');
        expect(rootElement.attributes('data-testid')).toBeUndefined();
        expect(rootElement.attributes('aria-label')).toBeUndefined();
        expect(rootElement.attributes('autocomplete')).toBeUndefined();

        // Check that attributes are applied to the input element
        const inputElement = wrapper.find('input');
        expect(inputElement.attributes('data-testid')).toBe('test-id');
        expect(inputElement.attributes('aria-label')).toBe('Custom Input');
        expect(inputElement.attributes('autocomplete')).toBe('off');
    });

    it('emits focus event when input is focused', async () => {
        const onFocus = vi.fn();
        const wrapper = mount(FieldCombinedBaseDropdown, {
            props: {
                ...defaultProps,
                isOpen: true,
            },
            attrs: {
                onFocus,
            }
        });

        const input = wrapper.find('input');
        await input.trigger('focus');

        // Check that the focus event was emitted
        expect(onFocus).toHaveBeenCalled();
    });
});
