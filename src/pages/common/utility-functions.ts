// this file contains functions that will be used throughout the app

export const printDate = (date: Date) => {
    if (date) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        return month + "/" + day + "/" + year;
    }
    return "";
};

export const calculateProgress = (starting, current) => {
    if (starting > 0 && current >= 0) {
        return current > starting ? 0 : (starting - current) / starting;
    }
    return 0;
};