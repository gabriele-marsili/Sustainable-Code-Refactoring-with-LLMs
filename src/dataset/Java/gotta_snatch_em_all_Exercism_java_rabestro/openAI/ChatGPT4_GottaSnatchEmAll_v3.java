import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.BinaryOperator;

import static java.util.function.Predicate.not;

class GottaSnatchEmAll {

    static Set<String> newCollection(List<String> cards) {
        return new HashSet<>(cards);
    }

    static boolean addCard(String card, Set<String> collection) {
        return collection.add(card);
    }

    static boolean canTrade(Set<String> myCollection, Set<String> theirCollection) {
        for (String card : myCollection) {
            if (!theirCollection.contains(card)) {
                for (String theirCard : theirCollection) {
                    if (!myCollection.contains(theirCard)) {
                        return true;
                    }
                }
                break;
            }
        }
        return false;
    }

    static Set<String> commonCards(List<Set<String>> collections) {
        if (collections.isEmpty()) {
            return Set.of();
        }
        Set<String> result = new HashSet<>(collections.get(0));
        for (int i = 1; i < collections.size(); i++) {
            result.retainAll(collections.get(i));
            if (result.isEmpty()) {
                break;
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