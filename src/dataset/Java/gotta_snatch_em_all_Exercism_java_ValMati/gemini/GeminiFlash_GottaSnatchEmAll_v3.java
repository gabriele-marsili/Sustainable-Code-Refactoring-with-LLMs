import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Iterator;

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
        if (myCollection.size() < theirCollection.size()) {
            return !theirCollection.containsAll(myCollection);
        }
        return !myCollection.containsAll(theirCollection);
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
                result = intersection(result, currentCollection);
            }
        }

        return result;
    }

    private static <T> Set<T> intersection(Set<T> set1, Set<T> set2) {
        Set<T> result = new HashSet<>();
        Iterator<T> iterator = set1.iterator();
        while (iterator.hasNext()) {
            T element = iterator.next();
            if (set2.contains(element)) {
                result.add(element);
            }
        }
        return result;
    }

    static Set<String> allCards(List<Set<String>> collections) {
        Set<String> result = new HashSet<>();

        for (Set<String> collection : collections) {
            result.addAll(collection);
        }

        return result;
    }
}