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
    if (myCollection.size() == theirCollection.size()) {
      return !myCollection.equals(theirCollection);
    }
    Set<String> smaller = myCollection.size() < theirCollection.size() ? myCollection : theirCollection;
    Set<String> larger = myCollection.size() < theirCollection.size() ? theirCollection : myCollection;
    return !larger.containsAll(smaller);
  }

  static Set<String> commonCards(List<Set<String>> collections) {
    if (collections.isEmpty()) {
      return new HashSet<>();
    }
    
    Set<String> smallest = collections.get(0);
    for (int i = 1; i < collections.size(); i++) {
      if (collections.get(i).size() < smallest.size()) {
        smallest = collections.get(i);
      }
    }
    
    Set<String> intersection = new HashSet<>();
    for (String card : smallest) {
      boolean inAll = true;
      for (Set<String> collection : collections) {
        if (!collection.contains(card)) {
          inAll = false;
          break;
        }
      }
      if (inAll) {
        intersection.add(card);
      }
    }
    return intersection;
  }

  static Set<String> allCards(List<Set<String>> collections) {
    int totalSize = collections.stream().mapToInt(Set::size).sum();
    Set<String> union = new HashSet<>(totalSize);
    for (Set<String> collection : collections) {
      union.addAll(collection);
    }
    return union;
  }
}