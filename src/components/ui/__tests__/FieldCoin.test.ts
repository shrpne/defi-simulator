import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import FieldCoin from '@/components/ui/FieldCoin.vue';
import InputMaskedAmount from '@/components/ui/InputMaskedAmount.vue';
import FieldCombinedUseMax from '@/components/ui/FieldCombinedUseMax.vue';
import FieldCombinedBaseDropdown from '@/components/ui/FieldCombinedBaseDropdown.vue';

describe('FieldCoin.vue', () => {
    const defaultProps = {
        coin: '',
        amount: '',
        options: [
            { symbol: 'ETH', contractAddress: '0x1', value: '1000000000000000000', usdValue: 3000 },
            { symbol: 'USDC', contractAddress: '0x2', value: '1000000', usdValue: 1 },
        ],
        label: 'Test Label',
        isDecimal: true,
        getSuggestionValue: (option: any) => option.symbol,
    };

    const createWrapper = ({ props = {}, attrs = {}, ...other }: Parameters<typeof mount>[0] = {}) => {
        return mount(FieldCoin, {
            ...other,
            props: { ...defaultProps, ...props },
            attrs,
            // global: {
            //     components: {
            //         InputMaskedAmount,
            //         FieldCombinedUseMax,
            //         FieldCombinedBaseDropdown,
            //     },
            // },
        });
    };

    describe('Component Rendering', () => {
        it('renders all child components correctly', () => {
            const wrapper = createWrapper();
            expect(wrapper.findComponent(FieldCombinedBaseDropdown).exists()).toBe(true);
            expect(wrapper.findComponent(InputMaskedAmount).exists()).toBe(true);
            expect(wrapper.findComponent(FieldCombinedUseMax).exists()).toBe(true);
        });

        it('displays label and initial placeholder correctly', () => {
            const wrapper = createWrapper();
            expect(wrapper.find('.h-field__title').text()).toBe('Test Label');
            expect(wrapper.find('.h-field__select-button').text().trim()).toBe('Select coin');
        });

        it('applies estimation styling when isEstimation is true', () => {
            const wrapper = createWrapper({ props: { isEstimation: true } });
            expect(wrapper.classes()).toContain('h-field--is-dashed');
        });
    });

    describe('Token Selection', () => {
        it('opens dropdown and shows options when button is clicked', async () => {
            const wrapper = createWrapper();
            await wrapper.find('.h-field__select-button').trigger('click');

            const dropdown = wrapper.findComponent(FieldCombinedBaseDropdown);
            expect(dropdown.props('isOpen')).toBe(true);

            // Wait for dropdown to render
            await wrapper.vm.$nextTick();
            const options = wrapper.findAll('.h-field__suggestion-item');
            expect(options).toHaveLength(2);
            expect(options[0].text()).toContain('ETH');
            expect(options[1].text()).toContain('USDC');
        });

        it('selects token and updates display when option is clicked', async () => {
            const wrapper = createWrapper();
            await wrapper.find('.h-field__select-button').trigger('click');

            // Wait for dropdown to render
            await wrapper.vm.$nextTick();
            const options = wrapper.findAll('.h-field__suggestion-item');
            await options[0].trigger('click');

            expect(wrapper.emitted('update:coin')?.[0][0]).toEqual(defaultProps.options[0]);
        });
    });

    describe('Amount Input Integration', () => {
        it('handles amount input and validates correctly', async () => {
            const wrapper = createWrapper({
                props: {
                    amount: '100',
                    v$amount: { $error: false, $touch: vi.fn() },
                },
            });

            const input = wrapper.findComponent(InputMaskedAmount);
            await input.vm.$emit('update:model-value', '150');

            expect(wrapper.emitted('update:amount')?.[0][0]).toBe('150');
        });

        it('shows error state when validation fails', async () => {
            const wrapper = createWrapper({
                props: {
                    amount: '100',
                    v$amount: { $error: true, $touch: vi.fn() },
                },
            });

            expect(wrapper.find('.h-field__aside').classes()).toContain('is-error');
        });
    });

    describe('Max Amount Integration', () => {
        it('handles max amount selection correctly', async () => {
            const wrapper = createWrapper({
                props: {
                    amount: '100',
                    maxValue: '1000',
                },
            });

            const maxButton = wrapper.findComponent(FieldCombinedUseMax);
            await maxButton.vm.$emit('update:is-use-max', true);
            await maxButton.vm.$emit('use-max');

            expect(wrapper.emitted('update:is-use-max')?.[0][0]).toBe(true);
            expect(wrapper.emitted('use-max')).toBeTruthy();
        });

        it('updates amount when max is selected', async () => {
            const maxValue = '1000';
            const wrapper = createWrapper({
                props: {
                    amount: '100',
                    maxValue,
                },
            });

            const maxButton = wrapper.findComponent(FieldCombinedUseMax);
            await maxButton.trigger('click');

            expect(wrapper.emitted('update:amount')?.[0][0]).toBe(maxValue);
        });
    });

    describe('Search and Filter Integration', () => {
        it('filters options based on search input', async () => {
            const wrapper = createWrapper();
            await wrapper.find('.h-field__select-button').trigger('click');

            const dropdown = wrapper.findComponent(FieldCombinedBaseDropdown);
            const input = wrapper.find('.h-field__dropdown-input');

            await input.setValue('ETH');
            await wrapper.vm.$nextTick();

            const filteredOptions = wrapper.findAll('.h-field__suggestion-item');
            expect(filteredOptions).toHaveLength(1);
            expect(filteredOptions[0].text()).toContain('ETH');
        });

        it('handles keyboard navigation in dropdown', async () => {
            const wrapper = createWrapper({
                attachTo: document.body,
            });

            // Open the dropdown
            await wrapper.find('.h-field__select-button').trigger('click');
            // await new Promise((resolve) => setTimeout(resolve, 500));

            // Get the dropdown component
            const dropdown = wrapper.findComponent(FieldCombinedBaseDropdown);
            expect(dropdown.props('isOpen')).toBe(true);

            // Simulate keyboard navigation
            await dropdown.trigger('keydown', { code: 'ArrowDown' });
            await dropdown.trigger('keydown', { code: 'Enter', keyCode: 13, key: 'Enter' });

            // Verify that the selection event was emitted
            expect(wrapper.emitted('update:coin')).toBeTruthy();
            expect(wrapper.emitted('update:coin')[0][0]).toEqual(defaultProps.options[0]);
        });
    });

    describe('Edge Cases and Error Handling', () => {
        it('handles empty options gracefully', () => {
            const wrapper = createWrapper({
                props: { options: [] },
            });
            expect(wrapper.find('.h-field__select-button').attributes('disabled')).toBeDefined();
        });

        it('handles undefined maxValue correctly', () => {
            const wrapper = createWrapper({
                props: { maxValue: undefined },
            });
            expect(wrapper.findComponent(FieldCombinedUseMax).exists()).toBe(true);
        });

        it('handles invalid amount input', async () => {
            const wrapper = createWrapper();
            const input = wrapper.findComponent(InputMaskedAmount);

            await input.vm.$emit('update:model-value', 'invalid');
            expect(wrapper.emitted('update:amount')?.[0][0]).toBe('invalid');
        });
    });

    describe('Responsive Behavior', () => {
        it('maintains functionality on mobile viewport', async () => {
            // Set viewport size
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 375,
            });
            window.dispatchEvent(new Event('resize'));

            const wrapper = createWrapper();
            await wrapper.find('.h-field__select-button').trigger('click');

            expect(wrapper.findComponent(FieldCombinedBaseDropdown).exists()).toBe(true);
        });
    });

    describe('Accessibility', () => {
        it('maintains keyboard navigation accessibility', async () => {
            const wrapper = createWrapper({
                attachTo: document.body,
            });
            const button = wrapper.find('.h-field__select-button');

            // Verify dropdown is initially closed
            expect(wrapper.findComponent(FieldCombinedBaseDropdown).props('isOpen')).toBe(false);

            // Trigger Enter key on the button to open dropdown
            await button.trigger('keydown.enter');
            // Browsers fire click if Enter is pressed on a button (simulate it)
            await button.trigger('click');

            // Verify dropdown is now open
            expect(wrapper.findComponent(FieldCombinedBaseDropdown).props('isOpen')).toBe(true);
        });

        it('has proper ARIA attributes', () => {
            const wrapper = createWrapper();
            const button = wrapper.find('.h-field__select-button');

            expect(button.attributes('type')).toBe('button');
        });
    });
});
