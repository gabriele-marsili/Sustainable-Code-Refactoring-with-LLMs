public class Hamming {
    public static Integer compute(String dna_a, String dna_b) {
        if (dna_a.length() != dna_b.length()) {
            throw new IllegalArgumentException();
        }
        int distance = 0;
        for (int i = 0, len = dna_a.length(); i < len; i++) {
            distance += (dna_a.charAt(i) != dna_b.charAt(i)) ? 1 : 0;
        }
        return distance;
    }
}