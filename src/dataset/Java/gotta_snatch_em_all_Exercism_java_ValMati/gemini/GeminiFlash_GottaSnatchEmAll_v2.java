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

        if (mySize < theirSize) {
            return !theirCollection.containsAll(myCollection);
        } else {
            return !myCollection.containsAll(theirCollection);
        }
    }

    static Set<String> commonCards(List<Set<String>> collections) {
        if (collections.isEmpty()) {
            return new HashSet<>();
        }

        Set<String> result = new HashSet<>(collections.get(0));

        for (int index = 1; index < collections.size(); index++) {
            Set<String> currentCollection = collections.get(index);
            if (currentCollection.size() < result.size()) {
                result.retainAll(currentCollection);
            } else {
                result.retainAll(currentCollection);
            }
        }

        return result;
    }

    static Set<String> allCards(List<Set<String>> collections) {
        Set<String> result = new HashSet<>();
        int maxSize = 0;
        Set<String> largestCollection = null;

        for (Set<String> collection : collections) {
            if (collection.size() > maxSize) {
                maxSize = collection.size();
                largestCollection = collection;
            }
        }

        if (largestCollection != null) {
            result.addAll(largestCollection);
            for (Set<String> collection : collections) {
                if (collection != largestCollection) {
                    result.addAll(collection);
                }
            }
        }

        return result;
    }
}