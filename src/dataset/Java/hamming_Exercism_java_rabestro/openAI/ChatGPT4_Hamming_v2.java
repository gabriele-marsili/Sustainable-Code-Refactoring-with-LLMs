public record Hamming(String leftStrand, String rightStrand) {

    public Hamming {
        if (leftStrand.length() != rightStrand.length()) {
            throw new IllegalArgumentException("strands must be of equal length");
        }
    }

    public int getHammingDistance() {
        int distance = 0;
        for (int i = 0, len = leftStrand.length(); i < len; i++) {
            if (leftStrand.charAt(i) != rightStrand.charAt(i)) {
                distance++;
            }
        }
        return distance;
    }
}