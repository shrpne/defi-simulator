import onCreateComponentCamelcase from './hook-on-create-component-camelcase.js';
import onCreateComponentRequired from './hook-on-create-component-required.js';

export default {
    extractingOptions: {
        // requestBodySuffix: ["Payload", "Body", "Input"],
        // requestParamsSuffix: ["Params"],
        responseBodySuffix: ['Response', 'Result', 'Output'],
        // responseErrorSuffix: [
        //     "Error",
        //     "Fail",
        //     "Fails",
        //     "ErrorData",
        //     "HttpError",
        //     "BadResponse",
        // ],
    },
    hooks: {
        onCreateComponent: (c) => onCreateComponentRequired(onCreateComponentCamelcase(c)),
        // onCreateRequestParams: (rawType) => {},
        // onCreateRoute: (routeData) => {},
        // onCreateRouteName: (routeNameInfo, rawRouteInfo) => {},
        // onFormatRouteName: (routeInfo, templateRouteName) => {},
        // onFormatTypeName: (typeName, rawTypeName, schemaType) => {},
        // onInit: (configuration) => {},
        // onParseSchema: (originalSchema, parsedSchema) => {
        //     console.log({originalSchema, parsedSchema});
        // },
        // onPrepareConfig: (currentConfiguration) => {},
    },
};
