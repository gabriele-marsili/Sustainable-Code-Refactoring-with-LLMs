export default class Raindrops {
    convert(n: number) {
        const div3 = n % 3 === 0;
        const div5 = n % 5 === 0;
        const div7 = n % 7 === 0;
        
        if (!(div3 || div5 || div7)) return n.toString();
        
        return (div3 ? 'Pling' : '') + 
               (div5 ? 'Plang' : '') + 
               (div7 ? 'Plong' : '');
    }
}