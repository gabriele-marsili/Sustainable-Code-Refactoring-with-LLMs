export function encode(input: string): string {
    let result = '';
    let count = 1;

    for (let i = 1; i <= input.length; i++) {
        if (input[i] === input[i - 1]) {
            count++;
        } else {
            result += count + input[i - 1];
            count = 1;
        }
    }

    return result;
}

export function decode(input: string): string {
    let result = '';
    let i = 0;

    while (i < input.length) {
        let count = 0;

        while (i < input.length && !isNaN(Number(input[i]))) {
            count = count * 10 + Number(input[i]);
            i++;
        }

        if (i < input.length) {
            result += input[i].repeat(count);
            i++;
        }
    }

    return result;
}

export default { encode, decode };