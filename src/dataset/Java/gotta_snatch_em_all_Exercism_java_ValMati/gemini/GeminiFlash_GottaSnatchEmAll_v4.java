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

        Set<String> result = new HashSet<>(collections.get(0));

        for (int i = 1; i < collections.size(); i++) {
            Set<String> collection = collections.get(i);
            result.retainAll(collection);
            if (result.isEmpty()) {
                break;
            }
        }

        return result;
    }

    static Set<String> allCards(List<Set<String>> collections) {
        Set<String> result = new HashSet<>();
        int totalSize = 0;
        for (Set<String> collection : collections) {
            totalSize += collection.size();
        }
        result = new HashSet<>(totalSize);

        for (Set<String> collection : collections) {
            result.addAll(collection);
        }

        return result;
    }
}