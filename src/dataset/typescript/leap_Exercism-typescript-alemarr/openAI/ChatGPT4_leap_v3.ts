export const isLeap = (year: number): boolean => 
    !(year & 3) && (year % 25 !== 0 || year % 16 === 0);