export function twoFer(name: string = 'you'): string {
  return name === 'you' ? 'One for you, one for me.' : `One for ${name}, one for me.`
}