type Divider = 3 | 5 | 7;
type Sound = "Pling" | "Plang" | "Plong";

const dividers: readonly [Divider, Sound][] = [
  [3, "Pling"],
  [5, "Plang"],
  [7, "Plong"],
] as const;

export function convert(input: number): string {
  let result = "";
  
  if (input % 3 === 0) result += "Pling";
  if (input % 5 === 0) result += "Plang";
  if (input % 7 === 0) result += "Plong";
  
  return result || input.toString();
}