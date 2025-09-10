import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

class GottaSnatchEmAll {
  static Set<String> newCollection(List<String> cards) {
    return cards == null ? new HashSet<>() : new HashSet<>(cards);
  }

  static boolean addCard(String card, Set<String> collection) {
    return card != null && collection != null && collection.add(card);
  }

  static boolean canTrade(Set<String> myCollection, Set<String> theirCollection) {
    if (myCollection == null || theirCollection == null) return false;
    return !myCollection.containsAll(theirCollection) && !theirCollection.containsAll(myCollection);
  }

  static Set<String> commonCards(List<Set<String>> collections) {
    if (collections == null || collections.isEmpty()) return new HashSet<>();
    Set<String> intersection = new HashSet<>(collections.get(0));
    for (int i = 1; i < collections.size(); i++) {
      intersection.retainAll(collections.get(i));
      if (intersection.isEmpty()) break;
    }
    return intersection;
  }

  static Set<String> allCards(List<Set<String>> collections) {
    if (collections == null || collections.isEmpty()) return new HashSet<>();
    return collections.stream()
        .filter(set -> set != null && !set.isEmpty())
        .flatMap(Set::stream)
        .collect(Collectors.toSet());
  }
}