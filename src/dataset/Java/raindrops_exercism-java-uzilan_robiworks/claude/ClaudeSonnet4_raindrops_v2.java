class RaindropConverter {

    String convert(int number) {
        boolean hasSound = false;
        StringBuilder output = new StringBuilder(15);
        
        if (number % 3 == 0) {
            output.append("Pling");
            hasSound = true;
        }
        if (number % 5 == 0) {
            output.append("Plang");
            hasSound = true;
        }
        if (number % 7 == 0) {
            output.append("Plong");
            hasSound = true;
        }
        
        return hasSound ? output.toString() : Integer.toString(number);
    }

}