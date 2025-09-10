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
    for (String card : theirCollection) {
      if (!myCollection.contains(card)) {
        for (String myCard : myCollection) {
          if (!theirCollection.contains(myCard)) {
            return true;
          }
        }
        break;
      }
    }
    return false;
  }

  static Set<String> commonCards(List<Set<String>> collections) {
    if (collections.isEmpty()) return new HashSet<>();
    Set<String> intersection = new HashSet<>(collections.get(0));
    for (int i = 1; i < collections.size(); i++) {
      intersection.retainAll(collections.get(i));
      if (intersection.isEmpty()) break;
    }
    return intersection;
  }

  static Set<String> allCards(List<Set<String>> collections) {
    Set<String> allCards = new HashSet<>();
    for (Set<String> collection : collections) {
      allCards.addAll(collection);
    }
    return allCards;
  }
}