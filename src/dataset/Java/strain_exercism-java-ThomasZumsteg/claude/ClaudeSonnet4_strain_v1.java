import java.util.List;
import java.util.ArrayList;
import java.util.function.Function;

public class Strain {
    public static <T> List<T> keep(List<T> items, Function<T, Boolean> func) {
        if (items.isEmpty()) {
            return new ArrayList<>();
        }
        
        List<T> kept = new ArrayList<>(items.size());
        for (T item : items) {
            if (func.apply(item)) {
                kept.add(item);
            }
        }
        return kept;
    }

    public static <T> List<T> discard(List<T> items, Function<T, Boolean> func) {
        if (items.isEmpty()) {
            return new ArrayList<>();
        }
        
        List<T> discarded = new ArrayList<>(items.size());
        for (T item : items) {
            if (!func.apply(item)) {
                discarded.add(item);
            }
        }
        return discarded;
    }
}