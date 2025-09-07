public class Hamming {
    public static Integer compute(String dna_a, String dna_b) {
        final int length = dna_a.length();
        if (length != dna_b.length())
            throw new IllegalArgumentException();
        
        int distance = 0;
        for (int i = 0; i < length; i++) {
            if (dna_a.charAt(i) != dna_b.charAt(i))
                distance++;
        }
        return distance;
    } 
}