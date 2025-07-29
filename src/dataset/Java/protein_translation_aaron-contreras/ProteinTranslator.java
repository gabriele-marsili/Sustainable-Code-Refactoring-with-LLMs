import java.util.List;
import java.util.ArrayList;

class ProteinTranslator {

    List<String> translate(String rnaSequence) {
        
        List<String> result = new ArrayList();

        for (int i = 0; i < rnaSequence.length(); i+=3) {
            
            String trio = rnaSequence.substring(i,i+3);

            if (trio.equals("UAA") || trio.equals("UAG") || trio.equals("UGA")) {
                return result;
            }
            if (trio.equals("AUG")) {
            result.add("Methionine");
            }
            if (trio.equals("UUU") || trio.equals("UUC")) {
                result.add("Phenylalanine");
            }
            if (trio.equals("UUA") || trio.equals("UUG")) {
                result.add("Leucine");
            }
            if (trio.equals("UCU") || trio.equals("UCC") || trio.equals("UCA") || trio.equals("UCG")) {
                result.add("Serine");
            }

            if (trio.equals("UAU") || trio.equals("UAC")) {
                result.add("Tyrosine");
            }
            if (trio.equals("UGU") || trio.equals("UGC")) {
                result.add("Cysteine");
            }
            if (trio.equals("UGG")) {
                result.add("Tryptophan");
            }
        }
        return result;
    }
}