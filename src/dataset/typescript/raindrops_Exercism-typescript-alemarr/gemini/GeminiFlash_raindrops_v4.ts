type Divider = 3 | 5 | 7;
type Sound = "Pling" | "Plang" | "Plong";
const dividers: [Divider, Sound][] = [
  [3, "Pling"],
  [5, "Plang"],
  [7, "Plong"],
];
export function convert(input: number): string {
  let result = "";
  // Using a for...of loop is often more readable and can sometimes be slightly
  // more performant in modern JavaScript engines due to optimizations.
  // It also avoids the overhead of indexing.
  for (const [divider, sound] of dividers) {
    // The modulo operator is efficient.
    if (input % divider === 0) {
      // String concatenation is optimized by modern JS engines.
      result += sound;
    }
  }
  // This is a concise way to return the result or the string representation of the input.
  // It leverages the truthiness of non-empty strings.
  return result || input.toString();
}