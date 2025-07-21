type Divider = 3 | 5 | 7;
type Sound = "Pling" | "Plang" | "Plong";

export function convert(input: number): string {
  let converted = "";
  
  if (input % 3 === 0) converted += "Pling";
  if (input % 5 === 0) converted += "Plang";
  if (input % 7 === 0) converted += "Plong";
  
  return converted || input.toString();
}