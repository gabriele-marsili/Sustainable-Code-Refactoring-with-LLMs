import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

class GottaSnatchEmAll {
  static Set<String> newCollection(List<String> cards) {
    return new HashSet<>(cards);
  }

  static boolean addCard(String card, Set<String> collection) {
    return collection.add(card);
  }

  static boolean canTrade(Set<String> myCollection, Set<String> theirCollection) {
    long mySize = myCollection.size();
    long theirSize = theirCollection.size();

    if (mySize == theirSize) {
      return false;
    }

    if (mySize < theirSize) {
      return !myCollection.containsAll(theirCollection);
    } else {
      return !theirCollection.containsAll(myCollection);
    }
  }

  static Set<String> commonCards(List<Set<String>> collections) {
    if (collections.isEmpty()) {
      return new HashSet<>();
    }

    Set<String> intersection = new HashSet<>(collections.getFirst());
    for (int i = 1; i < collections.size(); i++) {
      intersection.retainAll(collections.get(i));
      if (intersection.isEmpty()) {
        break;
      }
    }
    return intersection;
  }

  static Set<String> allCards(List<Set<String>> collections) {
    return collections.stream().flatMap(Set::stream).collect(Collectors.toCollection(HashSet::new));
  }
}