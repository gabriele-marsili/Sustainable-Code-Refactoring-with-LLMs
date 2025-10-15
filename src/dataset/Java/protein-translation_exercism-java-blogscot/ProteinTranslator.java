import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

class ProteinTranslator {

  private Map<String, String> codons =
      Stream.of(new String[][]{
          {"AUG", "Methionine"},
          {"UUU", "Phenylalanine"},
          {"UUC", "Phenylalanine"},
          {"UUA", "Leucine"},
          {"UUG", "Leucine"},
          {"UCU", "Serine"},
          {"UCC", "Serine"},
          {"UCA", "Serine"},
          {"UCG", "Serine"},
          {"UAU", "Tyrosine"},
          {"UAC", "Tyrosine"},
          {"UGU", "Cysteine"},
          {"UGC", "Cysteine"},
          {"UGG", "Tryptophan"}
      }).collect(Collectors.toMap(data -> data[0], data -> data[1]));

  private List<String> stopCodons = List.of("UAA", "UAG", "UGA");

  List<String> translate(String rnaSequence) {
    List<String> output = new ArrayList<>();

    while (rnaSequence.length() > 0) {

      var nextCodon = rnaSequence.substring(0, 3);
      rnaSequence = rnaSequence.substring(3);

      if (stopCodons.contains(nextCodon)) {
        break;
      }
      output.add(codons.get(nextCodon));
    }
    return output;
  }
}