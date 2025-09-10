import java.util.Collection;
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

        if (mySize == theirSize && myCollection.equals(theirCollection)) {
            return false;
        }

        if (mySize > theirSize) {
            return !myCollection.containsAll(theirCollection);
        } else {
            return !theirCollection.containsAll(myCollection);
        }
    }

    static Set<String> commonCards(List<Set<String>> collections) {
        if (collections.isEmpty()) {
            return new HashSet<>();
        }

        Set<String> result = new HashSet<>(collections.getFirst());

        for (int index = 1; index < collections.size(); index++) {
            Set<String> currentCollection = collections.get(index);
            result.retainAll(currentCollection);
            if (result.isEmpty()) {
                return result;
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