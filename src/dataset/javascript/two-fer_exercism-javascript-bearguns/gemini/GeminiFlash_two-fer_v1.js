class TwoFer {
  twoFer(name) {
    const recipient = name || 'you';
    return `One for ${recipient}, one for me.`;
  }
}

export default TwoFer;