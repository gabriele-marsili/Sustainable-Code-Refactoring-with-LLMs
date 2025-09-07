class ReverseString {
  static reverse(input: string): string {
    let reversedString = "";
    for (let i = input.length - 1; i >= 0; i--) {
      reversedString += input[i];
    }
    return reversedString;
  }
}

export default ReverseString