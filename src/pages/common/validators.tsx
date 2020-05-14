export const validateNumber = (text) => {
    return /\d+/.test(text);
};

export const validatePositiveDecimal = (text) => {
    return /([1-9]\d*(\.\d{2})?)$|(0(\.\d{2})?)$/.test(text);
};

export const validateText = (text) => {
    return /[A-Za-z0-9]*/.test(text);
};

export const validateAlphanumericOnly = (text) => {
    return /[A-Za-z]+/.test(text);
};

export const validateNonEmptyText = (text) => {
    return /[A-Za-z0-9]+/.test(text);
};

export const validateNonEmptyString = (text) => {
    return text && /.+/.test(text);
};