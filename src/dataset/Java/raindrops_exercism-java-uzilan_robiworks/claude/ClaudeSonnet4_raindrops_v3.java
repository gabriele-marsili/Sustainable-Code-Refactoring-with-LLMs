class RaindropConverter {

    String convert(int number) {
        boolean div3 = number % 3 == 0;
        boolean div5 = number % 5 == 0;
        boolean div7 = number % 7 == 0;
        
        if (!div3 && !div5 && !div7) {
            return Integer.toString(number);
        }
        
        StringBuilder output = new StringBuilder(15);
        if (div3) output.append("Pling");
        if (div5) output.append("Plang");
        if (div7) output.append("Plong");
        return output.toString();
    }

}