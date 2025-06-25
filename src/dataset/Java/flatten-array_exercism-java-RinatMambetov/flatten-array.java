import java.util.ArrayList;
import java.util.List;

class Flattener {
    @SuppressWarnings("unchecked")
    <T> List<T> flatten(List<T> list) {
        List<T> result = new ArrayList<>();
        for (T item : list) {
            if (item instanceof List<?> && ((List<?>) item).isEmpty()) {
                continue;
            }
            if (item instanceof List<?>) {
                result.addAll(flatten((List<T>) item));
            } else if (item != null) {
                result.add(item);
            }
        }
        return result;
    }
}