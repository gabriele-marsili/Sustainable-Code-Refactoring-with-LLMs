class ReverseString {
  static reverse(input: string): string {
    let result = '';
    for (let i = input.length - 1; i >= 0; i--) {
      result += input[i];
    }
    return result;
  }
}

export default ReverseString;