export default class Raindrops {
    private static readonly SOUNDS = ['', 'Pling', 'Plang', '', 'Plong'] as const;
    private static readonly DIVISORS = [3, 5, 7] as const;

    convert(n: number): string {
        const sounds = this.getSounds(n);
        return sounds || n.toString();
    }

    private getSounds(n: number): string {
        let result = '';
        const mod3 = n % 3;
        const mod5 = n % 5;
        const mod7 = n % 7;

        if (mod3 === 0) result += Raindrops.SOUNDS[1];
        if (mod5 === 0) result += Raindrops.SOUNDS[2];
        if (mod7 === 0) result += Raindrops.SOUNDS[4];

        return result;
    }
}