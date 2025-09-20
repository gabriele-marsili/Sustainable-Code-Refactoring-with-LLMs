public class Hamming {
    public static Integer compute(String dna_a, String dna_b) {
        if (dna_a.length() != dna_b.length()) {
            throw new IllegalArgumentException();
        }

        int distance = 0;
        int length = dna_a.length();

        for (int i = 0; i < length; i++) {
            if (dna_a.charAt(i) != dna_b.charAt(i)) {
                distance++;
            }
        }

        return distance;
    }
}