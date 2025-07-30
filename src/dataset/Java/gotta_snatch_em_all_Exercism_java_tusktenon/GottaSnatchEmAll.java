import java.util.HashSet;
import java.util.List;
import java.util.Set;

class GottaSnatchEmAll {
  static Set<String> newCollection(List<String> cards) {
    return new HashSet<>(cards);
  }

  static boolean addCard(String card, Set<String> collection) {
    return collection.add(card);
  }

  static boolean canTrade(Set<String> myCollection, Set<String> theirCollection) {
    return !myCollection.containsAll(theirCollection) && !theirCollection.containsAll(myCollection);
  }

  static Set<String> commonCards(List<Set<String>> collections) {
    Set<String> intersection =
        collections.isEmpty() ? new HashSet<String>() : new HashSet<>(collections.getFirst());
    collections.subList(1, collections.size()).forEach(c -> intersection.retainAll(c));
    return intersection;
  }

  static Set<String> allCards(List<Set<String>> collections) {
    return collections.stream().collect(HashSet::new, Set::addAll, Set::addAll);
  }
}
