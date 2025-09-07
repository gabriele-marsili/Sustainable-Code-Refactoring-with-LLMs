public class Hamming {
    public static int compute(String dna_a, String dna_b) {
        if (dna_a.length() != dna_b.length()) {
            throw new IllegalArgumentException();
        }
        int distance = 0;
        for (int i = 0, len = dna_a.length(); i < len; i++) {
            if (dna_a.charAt(i) != dna_b.charAt(i)) {
                distance++;
            }
        }
        return distance;
    }
}