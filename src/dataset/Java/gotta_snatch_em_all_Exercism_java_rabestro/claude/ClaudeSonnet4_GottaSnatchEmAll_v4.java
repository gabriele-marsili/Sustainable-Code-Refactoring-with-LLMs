import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.BinaryOperator;
import java.util.stream.Collectors;

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
        
        Set<String> smaller = myCollection.size() <= theirCollection.size() ? myCollection : theirCollection;
        Set<String> larger = myCollection.size() > theirCollection.size() ? myCollection : theirCollection;
        
        boolean hasUniqueInSmaller = false;
        boolean hasUniqueInLarger = false;
        
        for (String card : smaller) {
            if (!larger.contains(card)) {
                hasUniqueInSmaller = true;
                break;
            }
        }
        
        if (!hasUniqueInSmaller) {
            return larger.size() > smaller.size();
        }
        
        for (String card : larger) {
            if (!smaller.contains(card)) {
                hasUniqueInLarger = true;
                break;
            }
        }
        
        return hasUniqueInLarger;
    }

    static Set<String> commonCards(List<Set<String>> collections) {
        if (collections.isEmpty()) {
            return Set.of();
        }
        
        Set<String> smallest = collections.get(0);
        for (int i = 1; i < collections.size(); i++) {
            if (collections.get(i).size() < smallest.size()) {
                smallest = collections.get(i);
            }
        }
        
        Set<String> result = new HashSet<>();
        for (String card : smallest) {
            boolean inAll = true;
            for (Set<String> collection : collections) {
                if (!collection.contains(card)) {
                    inAll = false;
                    break;
                }
            }
            if (inAll) {
                result.add(card);
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
        int totalSize = collections.stream().mapToInt(Set::size).sum();
        Set<String> result = new HashSet<>(totalSize);
        for (Set<String> collection : collections) {
            result.addAll(collection);
        }
        return result;
    }
}