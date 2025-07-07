type Divider = 3 | 5 | 7;
type Sound = "Pling" | "Plang" | "Plong";

const dividers: [Divider, Sound][] = [
  [3, "Pling"],
  [5, "Plang"],
  [7, "Plong"],
];

export function convert(input: number): string {
  let result = "";

  for (let i = 0; i < dividers.length; i++) {
    const [divider, sound] = dividers[i];
    if (input % divider === 0) {
      result += sound;
    }
  }

  return result || input.toString();
}
