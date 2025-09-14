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
        
        Set<String> result = new HashSet<>(smallest);
        
        for (Set<String> collection : collections) {
            if (collection != smallest) {
                result.retainAll(collection);
                if (result.isEmpty()) {
                    break;
                }
            }
        }
        
        return result;
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