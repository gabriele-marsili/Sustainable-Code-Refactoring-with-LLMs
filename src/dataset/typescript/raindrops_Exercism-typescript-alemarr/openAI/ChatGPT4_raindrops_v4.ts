type Divider = 3 | 5 | 7;
type Sound = "Pling" | "Plang" | "Plong";

const convertMap: Record<Divider, Sound> = {
  3: "Pling",
  5: "Plang",
  7: "Plong",
};

export function convert(input: number): string {
  let result = "";
  if (input % 3 === 0) result += convertMap[3];
  if (input % 5 === 0) result += convertMap[5];
  if (input % 7 === 0) result += convertMap[7];
  return result || input.toString();
}
