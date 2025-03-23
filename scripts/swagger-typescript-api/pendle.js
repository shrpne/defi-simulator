import onCreateComponent from './hook-on-create-component-pendle.js';

/** @type {import('swagger-typescript-api').GenerateApiParams} */
export default {
    hooks: {
        onCreateComponent: onCreateComponent,
        // onCreateRequestParams: (rawType) => {},
        // onCreateRoute: (routeData) => {},
        // onCreateRouteName: (routeNameInfo, rawRouteInfo) => {},
        // onFormatRouteName: (routeInfo, templateRouteName) => {},
        // onFormatTypeName: (typeName, rawTypeName) => {
        //     console.log({typeName, rawTypeName});
        // },
        // onInit: (configuration) => {},
        // onParseSchema: (originalSchema, parsedSchema) => {
        //     console.log({originalSchema, parsedSchema});
        // },
        // onPrepareConfig: (currentConfiguration) => {},
    },
    primitiveTypeConstructs: (struct) => ({
        "hex": "`0x${string}`"
    }),
};

/**
 *
 * @param {Record<string, any>} schema
 * @param {import('swagger-typescript-api').SchemaParser} parser
 */
function hexParser(schema, parser) {

}
