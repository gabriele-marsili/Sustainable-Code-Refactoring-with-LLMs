class ReverseString {
  String reverse(String inputString) {
    char[] chars = inputString.toCharArray();
    int left = 0, right = chars.length - 1;
    while (left < right) {
      char temp = chars[left];
      chars[left++] = chars[right];
      chars[right--] = temp;
    }
    return new String(chars);
  }
}