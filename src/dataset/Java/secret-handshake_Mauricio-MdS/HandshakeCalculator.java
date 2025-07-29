import java.util.Collections;
import java.util.EnumSet;
import java.util.List;
import java.util.stream.Collectors;

class HandshakeCalculator {

    List<Signal> calculateHandshake(int number) {
        var result = EnumSet.allOf(Signal.class).stream()
                .filter(s -> (signalToInt(s) & number) > 0)
                .collect(Collectors.toList());
        if ((number & 0b10000) > 0) Collections.reverse(result);
        return result;
    }

    private static int signalToInt(Signal signal) {
        return switch (signal) {
            case WINK -> 0b00001;
            case DOUBLE_BLINK -> 0b00010;
            case CLOSE_YOUR_EYES ->0b00100;
            case JUMP ->0b01000;
        };
    }
}
