/**
 *
 * @param {import('swagger-typescript-api').SchemaComponent} component
 * @return {import('swagger-typescript-api').SchemaComponent}
 */
export default function onCreateComponent(component) {

    if (component.rawTypeData?.properties?.address?.type === 'string') {
        // narrow down all addresses to Viem address type
        component.rawTypeData.properties.address.type = 'hex';
    }

    if (component.typeName === 'TransactionDto') {
        // narrow down to Viem
        component.rawTypeData.properties.to.type = 'hex';
        component.rawTypeData.properties.from.type = 'hex';
        component.rawTypeData.properties.data.type = 'hex';

        // fix: `value` may be not present in response
        component.rawTypeData.required = component.rawTypeData.required.filter((prop) => prop !== 'value')
    }

    if (component.typeName === 'SdkControllerSwapParams') {
        // narrow down to Viem
        component.rawTypeData.properties.tokenIn.type = 'hex';
        component.rawTypeData.properties.tokenOut.type = 'hex';
        component.rawTypeData.properties.receiver.type = 'hex';
    }

    return component;
}
