type Divider = 3 | 5 | 7;
type Sound = "Pling" | "Plang" | "Plong";

const dividers: readonly [Divider, Sound][] = [
  [3, "Pling"],
  [5, "Plang"],
  [7, "Plong"],
] as const;

export function convert(input: number): string {
  const result = dividers.reduce((acc, [divider, sound]) => 
    input % divider === 0 ? acc + sound : acc, "");
  return result || input.toString();
}
