class ReverseString {

    String reverse(String inputString) {
        if (inputString == null || inputString.length() <= 1) {
            return inputString;
        }
        
        char[] chars = inputString.toCharArray();
        int left = 0;
        int right = chars.length - 1;
        
        while (left < right) {
            char temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;
            left++;
            right--;
        }
        
        return new String(chars);
    }
}