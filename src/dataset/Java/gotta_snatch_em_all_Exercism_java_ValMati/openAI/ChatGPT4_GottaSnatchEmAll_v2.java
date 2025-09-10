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
                return true;
            }
        }
        for (String card : myCollection) {
            if (!theirCollection.contains(card)) {
                return true;
            }
        }
        return false;
    }

    static Set<String> commonCards(List<Set<String>> collections) {
        if (collections.isEmpty()) return new HashSet<>();
        Set<String> result = new HashSet<>(collections.get(0));
        for (int index = 1; index < collections.size(); index++) {
            result.retainAll(collections.get(index));
            if (result.isEmpty()) break; // Early exit if no common cards
        }
        return result;
    }

    static Set<String> allCards(List<Set<String>> collections) {
        Set<String> result = new HashSet<>(collections.size() * 16); // Pre-size to reduce resizing
        for (Set<String> collection : collections) {
            result.addAll(collection);
        }
        return result;
    }
}