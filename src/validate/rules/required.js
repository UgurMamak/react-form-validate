export const validateRequired = (value) => {
    return value === null || value === false || value === undefined || value === "" ? false : true;
}