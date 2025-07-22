export const convert = (number) => {
  const mod3 = number % 3 === 0;
  const mod5 = number % 5 === 0;
  const mod7 = number % 7 === 0;
  
  if (!(mod3 || mod5 || mod7)) return String(number);
  
  return (mod3 ? "Pling" : "") + 
         (mod5 ? "Plang" : "") + 
         (mod7 ? "Plong" : "");
};