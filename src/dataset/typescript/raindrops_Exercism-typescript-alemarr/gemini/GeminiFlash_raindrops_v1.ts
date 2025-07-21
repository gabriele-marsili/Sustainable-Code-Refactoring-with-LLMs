type Divider = 3 | 5 | 7;
type Sound = "Pling" | "Plang" | "Plong";

// Using an array of tuples instead of a Map for slightly better iteration performance
// and potentially lower memory overhead in this specific scenario, as the keys are fixed and small.
const sounds: [Divider, Sound][] = [
  [3, "Pling"],
  [5, "Plang"],
  [7, "Plong"],
];

export function convert(input: number): string {
  let converted: string = "";

  // Using a for...of loop for potentially better performance than forEach,
  // as it avoids the overhead of a callback function.
  for (const [divider, sound] of sounds) {
    if (input % divider === 0) {
      converted += sound;
    }
  }

  // Directly returning the input as a string if no sounds were added,
  // avoiding the intermediate 'converted.length === 0' check in the return statement.
  if (converted.length === 0) {
    return input.toString();
  }

  return converted;
}