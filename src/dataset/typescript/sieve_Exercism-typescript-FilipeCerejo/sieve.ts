export function primes(limit: number): number[] {
    // -1 to exclude 0
    let crive = Array.from(Array(limit - 1), () => true);
    let idx = 0;
    while (idx > -1 && idx < Math.ceil(Math.sqrt(limit))) {
        let multiple = 2;
        while (multiple * (idx + 2) <= limit) {
            // -2 -> 0 index refers to number 2
            crive[multiple * (idx + 2) - 2] = false;
            // console.log(crive);
            multiple++;
        }
        idx = crive.indexOf(true, idx + 1);
    }

    return crive.reduce((acc: number[], cur: boolean, idx: number) => {
        if (cur) acc.push(idx + 2); // +2 -> 0 index refers to number 2
        return acc;
    }, []);
}