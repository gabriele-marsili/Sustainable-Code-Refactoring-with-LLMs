import java.util.stream.Collectors;

class RotationalCipher {

    private final int shiftKey;

    RotationalCipher(int shiftKey) {
        this.shiftKey = shiftKey % 26;
    }

    String rotate(String data) {
        return data.chars()
                .map(this::rotateChar)
                .mapToObj(Character::toString)
                .collect(Collectors.joining());
    }

    private int rotateChar(int c) {
        return Character.isLetter(c) ? rotateLetter(c) : c;
    }

    private int rotateLetter(int c) {
        char initialLetter = Character.isUpperCase(c) ? 'A' : 'a';
        return (c - initialLetter + shiftKey) % 26 + initialLetter;

    }

}
