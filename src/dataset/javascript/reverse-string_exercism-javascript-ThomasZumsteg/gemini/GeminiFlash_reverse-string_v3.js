export default function(chars) {
  let srahc = "";
  for (let i = chars.length - 1; i >= 0; i--) {
    srahc += chars[i];
  }
  return srahc;
}