import camelCase from 'camelcase';

function camelizePropertiesObjKeys(properties) {
    return mapEntries(properties, ([propName, value]) => {
        console.log(propName, value);
        if (value.type === 'object' && value.properties) {
            value.properties =  camelizePropertiesObjKeys(value.properties);
        }
        // to camelCase property name
        return [camelCase(propName), value];
    })
}

export default function onCreateComponent(component) {
    // console.log(component.typeName, component.rawTypeData);
    if (component.rawTypeData.properties) {
        component.rawTypeData.properties = camelizePropertiesObjKeys(component.rawTypeData.properties);
    }
    if (component.rawTypeData.required && Array.isArray(component.rawTypeData.required)) {
        component.rawTypeData.required = component.rawTypeData.required.map((propName) => camelCase(propName));
    }
    return component;
}

function mapEntries(obj, mapCallbackFn) {
    return Object.fromEntries(Object.entries(obj).map(mapCallbackFn));
}
