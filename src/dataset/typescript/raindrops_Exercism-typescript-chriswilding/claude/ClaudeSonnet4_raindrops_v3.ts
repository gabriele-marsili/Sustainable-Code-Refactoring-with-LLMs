export default class Rainsdrops {
    private static readonly DIVISORS = [3, 5, 7] as const;
    private static readonly SOUNDS = ["Pling", "Plang", "Plong"] as const;
    
    convert(n: number): string {
        let result = "";
        
        for (let i = 0; i < 3; i++) {
            if (n % Rainsdrops.DIVISORS[i] === 0) {
                result += Rainsdrops.SOUNDS[i];
            }
        }
        
        return result || n.toString();
    }
}