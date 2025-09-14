import java.util.List;
import java.util.ArrayList;
import java.util.function.Function;

public class Accumulate {
    public static <T,S> List<S> accumulate(List<T> items, Function<T, S> transform) {
        if (items == null || items.isEmpty()) {
            return new ArrayList<>();
        }
        
        List<S> transformed_items = new ArrayList<>(items.size());
        for (int i = 0, size = items.size(); i < size; i++) {
            transformed_items.add(transform.apply(items.get(i)));
        }
        return transformed_items;
    }
}