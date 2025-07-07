type Divider = 3 | 5 | 7;
type Sound = "Pling" | "Plang" | "Plong";

const SOUNDS: readonly [Divider, Sound][] = [
  [3, "Pling"],
  [5, "Plang"],
  [7, "Plong"],
] as const;

export function convert(input: number): string {
  let result = "";
  
  for (const [divider, sound] of SOUNDS) {
    if (input % divider === 0) {
      result += sound;
    }
  }

  return result || input.toString();
}