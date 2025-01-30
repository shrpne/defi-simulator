/**
 *
 * @param {import('swagger-typescript-api').SchemaComponent} component
 * @return {import('swagger-typescript-api').SchemaComponent}
 */
export default function onCreateComponent(component) {

    if (component.typeName === 'TransactionDto') {
        // narrow down to Viem
        component.rawTypeData.properties.to.type = 'hex';
        component.rawTypeData.properties.from.type = 'hex';
        component.rawTypeData.properties.data.type = 'hex';

        // fix: `value` may be not present in response
        component.rawTypeData.required = component.rawTypeData.required.filter((prop) => prop !== 'value')
    }

    return component;
}
