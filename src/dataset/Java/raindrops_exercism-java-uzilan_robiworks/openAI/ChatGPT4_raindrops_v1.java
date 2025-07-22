class RaindropConverter {

    String convert(int number) {
        boolean divisible = false;
        char[] buffer = new char[16];
        int index = 0;

        if (number % 3 == 0) {
            buffer[index++] = 'P';
            buffer[index++] = 'l';
            buffer[index++] = 'i';
            buffer[index++] = 'n';
            buffer[index++] = 'g';
            divisible = true;
        }
        if (number % 5 == 0) {
            buffer[index++] = 'P';
            buffer[index++] = 'l';
            buffer[index++] = 'a';
            buffer[index++] = 'n';
            buffer[index++] = 'g';
            divisible = true;
        }
        if (number % 7 == 0) {
            buffer[index++] = 'P';
            buffer[index++] = 'l';
            buffer[index++] = 'o';
            buffer[index++] = 'n';
            buffer[index++] = 'g';
            divisible = true;
        }

        return divisible ? new String(buffer, 0, index) : Integer.toString(number);
    }

}
