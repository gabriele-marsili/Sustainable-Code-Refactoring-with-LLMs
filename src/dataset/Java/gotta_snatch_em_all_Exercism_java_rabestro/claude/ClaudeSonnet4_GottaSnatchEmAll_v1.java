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
        if (myCollection.isEmpty() || theirCollection.isEmpty()) {
            return !myCollection.isEmpty() || !theirCollection.isEmpty();
        }
        
        boolean myHasUnique = false;
        boolean theirHasUnique = false;
        
        for (String card : myCollection) {
            if (!theirCollection.contains(card)) {
                myHasUnique = true;
                break;
            }
        }
        
        if (!myHasUnique) {
            return false;
        }
        
        for (String card : theirCollection) {
            if (!myCollection.contains(card)) {
                theirHasUnique = true;
                break;
            }
        }
        
        return theirHasUnique;
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

    private static BinaryOperator<Set<String>> commonElements() {
        return (acc, elem) -> {
            acc.retainAll(elem);
            return acc;
        };
    }

    static Set<String> allCards(List<Set<String>> collections) {
        Set<String> result = new HashSet<>();
        for (Set<String> collection : collections) {
            result.addAll(collection);
        }
        return result;
    }
}