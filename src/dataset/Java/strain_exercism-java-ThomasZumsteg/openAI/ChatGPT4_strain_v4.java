import java.util.List;
import java.util.ArrayList;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Strain {
    public static <T> List<T> keep(List<T> items, Function<T, Boolean> func) {
        return items.stream()
                    .filter(func::apply)
                    .collect(Collectors.toList());
    }

    public static <T> List<T> discard(List<T> items, Function<T, Boolean> func) {
        return items.stream()
                    .filter(item -> !func.apply(item))
                    .collect(Collectors.toList());
    }
}