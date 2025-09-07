// @ts-check

export function needsLicense(kind) {
  return kind === "car" || kind === "truck";
}

export function chooseVehicle(option1, option2) {
  return `${option1 < option2 ? option1 : option2} is clearly the better choice.`;
}

export function calculateResellPrice(originalPrice, age) {
  return originalPrice * (age < 3 ? 0.8 : age > 10 ? 0.5 : 0.7);
}