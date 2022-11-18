export const resReturn = (data: any, error?: number, msg?: string) => {
    return {
        error: error || 0,
        msg,
        data
    };
};

const instances = new Map();
export const getModelInstance = (m) => {
    if (!instances.get(m)) {
        instances.set(m, new m());
    }
    return instances.get(m);
};
