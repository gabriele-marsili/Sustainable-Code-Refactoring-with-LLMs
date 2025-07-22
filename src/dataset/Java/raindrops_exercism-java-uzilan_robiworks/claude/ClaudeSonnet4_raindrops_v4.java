class RaindropConverter {

    String convert(int number) {
        final int mod15 = number % 15;
        final int mod21 = number % 21;
        final int mod35 = number % 35;
        
        if (mod15 == 0) {
            return mod21 == 0 ? "PlingPlangPlong" : "PlingPlang";
        }
        if (mod21 == 0) {
            return "PlingPlong";
        }
        if (mod35 == 0) {
            return "PlangPlong";
        }
        if (number % 3 == 0) {
            return "Pling";
        }
        if (number % 5 == 0) {
            return "Plang";
        }
        if (number % 7 == 0) {
            return "Plong";
        }
        
        return Integer.toString(number);
    }

}