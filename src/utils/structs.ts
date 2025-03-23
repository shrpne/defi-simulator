import type { ValueOf } from "type-fest";

type OmitNullish<T> = {
    [K in keyof T as null extends T[K] ? K : (undefined extends T[K] ? K : never)]?: Exclude<T[K], undefined|null>;
} & {
    [K in keyof T as null extends T[K] ? never : (undefined extends T[K] ? never : K)]: T[K];
};

export function omitNullish<T extends Record<string, unknown>>(obj: T): OmitNullish<T> {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined)
    ) as OmitNullish<T>;
}

type NonNullableObj<T> = {
    [P in keyof T]: NonNullable<T[P]>
}

export type NonNullableFields<T, K extends keyof T> = T & Required<NonNullableObj<Pick<T, K>>>

// @see https://github.com/sodiray/radash/blob/master/src/object.ts#L56
// @see https://github.com/toss/es-toolkit/blob/main/src/object/mapValues.ts
export function mapValues<T extends object, MappedValue>(source: T, mapper: (value: ValueOf<T>, key: keyof T) => MappedValue) {
    const result = {} as Record<keyof T, MappedValue>;
    for (const key in source) {
        result[key] = mapper(source[key] as ValueOf<typeof source>, key);
    }

    return result;
}
