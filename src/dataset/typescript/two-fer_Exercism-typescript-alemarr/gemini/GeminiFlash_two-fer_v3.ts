export const twoFer = (name?: string): string => {
  const recipient = name || 'you';
  return `One for ${recipient}, one for me.`;
};