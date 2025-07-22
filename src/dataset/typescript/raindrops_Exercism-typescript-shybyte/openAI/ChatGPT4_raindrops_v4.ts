export default class Raindrops {
    convert(n: number) {
        const sounds = [];
        if (!(n % 3)) sounds.push('Pling');
        if (!(n % 5)) sounds.push('Plang');
        if (!(n % 7)) sounds.push('Plong');
        return sounds.length ? sounds.join('') : n.toString();
    }
}
