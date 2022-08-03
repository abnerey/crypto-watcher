type ParamType = number | string | null | undefined | Array<any>;

export const isEmpty = (value: ParamType) => {
    if (Array.isArray(value)) return !value.length;
    return !value;
};
