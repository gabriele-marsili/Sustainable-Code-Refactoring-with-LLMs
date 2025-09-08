import java.util.List;
import java.util.ArrayList;
import java.util.function.Predicate;

public class Strain {
    public static <T> List<T> keep(List<T> items, Predicate<T> predicate) {
        List<T> kept = new ArrayList<>(items.size());
        for (T item : items) {
            if (predicate.test(item)) {
                kept.add(item);
            }
        }
        return kept;
    }

    public static <T> List<T> discard(List<T> items, Predicate<T> predicate) {
        List<T> discarded = new ArrayList<>(items.size());
        for (T item : items) {
            if (!predicate.test(item)) {
                discarded.add(item);
            }
        }
        return discarded;
    }
}