type Divider = 3 | 5 | 7;
type Sound = "Pling" | "Plang" | "Plong";

const sounds: [Divider, Sound][] = [
  [3, "Pling"],
  [5, "Plang"],
  [7, "Plong"],
];

export function convert(input: number): string {
  let converted = "";

  for (const [divider, sound] of sounds) {
    if (input % divider === 0) {
      converted += sound;
    }
  }

  return converted || input.toString();
}