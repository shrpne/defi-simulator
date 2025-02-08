
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
