class RaindropConverter {
  private static final int[] keys = {3, 5, 7};
  private static final String[] values = {"Pling", "Plang", "Plong"};

  String convert(int number) {
    int length = 0;
    char[] buffer = new char[15];
    int pos = 0;

    for (int i = 0; i < keys.length; i++) {
      if (number % keys[i] == 0) {
        String val = values[i];
        int valLen = val.length();
        for (int j = 0; j < valLen; j++) {
          buffer[pos++] = val.charAt(j);
        }
        length += valLen;
      }
    }

    if (length > 0) {
      return new String(buffer, 0, length);
    }

    // Convert number to string manually to avoid creating extra StringBuilder
    boolean negative = number < 0;
    int num = negative ? -number : number;
    int digits = 0;
    int temp = num;

    do {
      digits++;
      temp /= 10;
    } while (temp != 0);

    char[] numChars = new char[negative ? digits + 1 : digits];
    int index = numChars.length - 1;

    do {
      numChars[index--] = (char) ('0' + (num % 10));
      num /= 10;
    } while (num != 0);

    if (negative) {
      numChars[0] = '-';
    }

    return new String(numChars);
  }
}
