export function twoFer(name: string = 'you'): string {
  const template = 'One for ';
  const suffix = ', one for me.';
  return template + name + suffix;
}