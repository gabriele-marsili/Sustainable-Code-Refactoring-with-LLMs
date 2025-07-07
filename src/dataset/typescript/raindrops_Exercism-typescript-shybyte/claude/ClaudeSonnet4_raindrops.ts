const FACTOR_RAINDROP_PAIRS: ReadonlyArray<readonly [number, string]> = [
    [3, 'Pling'],
    [5, 'Plang'],
    [7, 'Plong']
] as const

export default class Raindrops {
    convert(n: number): string {
        let result = ''
        
        for (const [factor, drop] of FACTOR_RAINDROP_PAIRS) {
            if (n % factor === 0) {
                result += drop
            }
        }
        
        return result || n.toString()
    }
}