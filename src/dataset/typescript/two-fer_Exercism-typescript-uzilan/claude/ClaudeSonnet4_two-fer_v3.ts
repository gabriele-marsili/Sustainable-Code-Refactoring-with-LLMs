export function twoFer(input: string = 'you'): string {
    return input === 'you' 
        ? 'One for you, one for me.'
        : `One for ${input}, one for me.`;
}