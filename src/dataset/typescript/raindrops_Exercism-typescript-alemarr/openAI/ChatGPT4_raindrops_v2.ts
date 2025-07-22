type Divider = 3 | 5 | 7;
type Sound = "Pling" | "Plang" | "Plong";

const dividers = [
  [3, "Pling"],
  [5, "Plang"],
  [7, "Plong"],
] as const;

export function convert(input: number): string {
  const result = dividers
    .filter(([divider]) => input % divider === 0)
    .map(([, sound]) => sound)
    .join("");

  return result || input.toString();
}
