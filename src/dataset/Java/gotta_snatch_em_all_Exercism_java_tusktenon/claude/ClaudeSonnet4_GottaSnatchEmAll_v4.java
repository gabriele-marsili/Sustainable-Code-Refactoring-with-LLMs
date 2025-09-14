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
    if (myCollection.size() > theirCollection.size()) {
      return !theirCollection.containsAll(myCollection);
    } else {
      return !myCollection.containsAll(theirCollection);
    }
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
    
    Set<String> intersection = new HashSet<>(smallest);
    for (Set<String> collection : collections) {
      if (collection != smallest) {
        intersection.retainAll(collection);
        if (intersection.isEmpty()) {
          break;
        }
      }
    }
    return intersection;
  }

  static Set<String> allCards(List<Set<String>> collections) {
    int totalSize = collections.stream().mapToInt(Set::size).sum();
    Set<String> result = new HashSet<>(totalSize);
    for (Set<String> collection : collections) {
      result.addAll(collection);
    }
    return result;
  }
}