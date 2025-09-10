// @ts-check

export function dayRate(ratePerHour) {
    return ratePerHour * 8;
}

export function monthRate(ratePerHour, discount) {
    const monthlyRate = dayRate(ratePerHour) * 22;
    return Math.ceil(monthlyRate * (1 - discount));
}

export function daysInBudget(budget, ratePerHour, discount) {
    const discountedDayRate = dayRate(ratePerHour) * (1 - discount);
    return Math.floor(budget / discountedDayRate);
}

function applyDiscount(value, percentage) {
    return value * (1 - percentage);
}