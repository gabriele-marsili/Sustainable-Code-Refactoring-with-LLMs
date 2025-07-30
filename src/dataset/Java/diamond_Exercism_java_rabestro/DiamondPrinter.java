import java.util.Arrays;
import java.util.List;
import java.util.function.IntFunction;
import java.util.stream.IntStream;

public final class DiamondPrinter {
    public static List<String> printToList(char targetLetter) {
        IntFunction<String> linePrinter = codePoint -> {
            var line = new char[2 * (targetLetter - 'A') + 1];
            Arrays.fill(line, ' ');
            line[targetLetter - codePoint] = (char) codePoint;
            line[line.length - 1 - targetLetter + codePoint] = (char) codePoint;
            return new String(line);
        };
        var forwardSequence = IntStream.rangeClosed('A', targetLetter);
        var backwardSequence = IntStream.iterate(targetLetter - 1, i -> i >= 'A', i -> i - 1);

        return IntStream.concat(forwardSequence, backwardSequence).mapToObj(linePrinter).toList();
    }
}
