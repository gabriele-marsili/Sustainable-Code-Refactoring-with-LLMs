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
    if (myCollection.size() == theirCollection.size() && myCollection.equals(theirCollection)) {
      return false;
    }
    return !myCollection.containsAll(theirCollection) && !theirCollection.containsAll(myCollection);
  }

  static Set<String> commonCards(List<Set<String>> collections) {
    if (collections.isEmpty()) {
      return new HashSet<>();
    }

    Set<String> intersection = new HashSet<>(collections.getFirst());
    for (int i = 1; i < collections.size(); i++) {
      intersection.retainAll(collections.get(i));
    }
    return intersection;
  }

  static Set<String> allCards(List<Set<String>> collections) {
    Set<String> all = new HashSet<>();
    for (Set<String> collection : collections) {
      all.addAll(collection);
    }
    return all;
  }
}