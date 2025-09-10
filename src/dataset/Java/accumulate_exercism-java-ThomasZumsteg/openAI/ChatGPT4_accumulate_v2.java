import java.util.List;
import java.util.ArrayList;
import java.util.function.Function;

public class Accumulate {
    public static <T, S> List<S> accumulate(List<T> items, Function<T, S> transform) {
        return items.stream()
                    .map(transform)
                    .toList();
    }
}