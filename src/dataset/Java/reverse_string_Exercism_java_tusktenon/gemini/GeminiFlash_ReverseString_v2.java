class ReverseString {
  String reverse(String inputString) {
    if (inputString == null || inputString.isEmpty()) {
      return inputString;
    }
    char[] charArray = inputString.toCharArray();
    int left = 0;
    int right = charArray.length - 1;
    while (left < right) {
      char temp = charArray[left];
      charArray[left] = charArray[right];
      charArray[right] = temp;
      left++;
      right--;
    }
    return new String(charArray);
  }
}