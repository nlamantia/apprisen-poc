// this file contains functions that will be used throughout the app

export const printDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return month + "/" + day + "/" + year;
};

export const calculateProgress = (starting, current) => {
    return current > starting ? 0 : (starting - current) / starting;
};