import java.util.List;
import java.util.ArrayList;
import java.util.function.Function;

public class Accumulate {
    public static <T, S> List<S> accumulate(List<T> items, Function<T, S> transform) {
        List<S> transformedItems = new ArrayList<>(items.size());
        items.forEach(item -> transformedItems.add(transform.apply(item)));
        return transformedItems;
    }
}