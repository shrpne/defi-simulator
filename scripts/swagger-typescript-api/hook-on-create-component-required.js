export default function onCreateComponent(component) {
    // console.log(component.typeName, component.rawTypeData);
    if (component.rawTypeData.properties) {
        component.rawTypeData.properties = mapEntries(component.rawTypeData.properties, ([propName, value]) => {
            // console.log(propName, value);
            // mark every property as `optional: false`
            value.required = true;
            return [propName, value];
        });
    }
    return component;
}

function mapEntries(obj, mapCallbackFn) {
    return Object.fromEntries(Object.entries(obj).map(mapCallbackFn));
}
