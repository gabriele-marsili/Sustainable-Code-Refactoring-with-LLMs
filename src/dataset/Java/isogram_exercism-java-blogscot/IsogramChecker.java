import java.util.HashSet;
import java.util.stream.Collectors;

class IsogramChecker {

  boolean isIsogram(String phrase) {
    var letters = phrase
        .chars()
        .mapToObj(Character::toLowerCase)
        .filter(Character::isLetter)
        .collect(Collectors.toList());

    return letters.size() == new HashSet<>(letters).size();
  }

}
