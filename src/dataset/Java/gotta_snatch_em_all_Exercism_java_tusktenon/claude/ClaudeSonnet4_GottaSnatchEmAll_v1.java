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
    int mySize = myCollection.size();
    int theirSize = theirCollection.size();
    
    if (mySize > theirSize) {
      return !myCollection.containsAll(theirCollection);
    } else if (theirSize > mySize) {
      return !theirCollection.containsAll(myCollection);
    } else {
      return !myCollection.equals(theirCollection);
    }
  }

  static Set<String> commonCards(List<Set<String>> collections) {
    if (collections.isEmpty()) {
      return new HashSet<>();
    }
    
    Set<String> smallest = collections.get(0);
    int smallestSize = smallest.size();
    
    for (int i = 1; i < collections.size(); i++) {
      Set<String> current = collections.get(i);
      if (current.size() < smallestSize) {
        smallest = current;
        smallestSize = current.size();
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
    int totalSize = 0;
    for (Set<String> collection : collections) {
      totalSize += collection.size();
    }
    
    Set<String> result = new HashSet<>(totalSize);
    for (Set<String> collection : collections) {
      result.addAll(collection);
    }
    
    return result;
  }
}