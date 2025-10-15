class ReverseString {

    String reverse(String inputString) {
        return inputString.chars()
                .mapToObj(Character::toString)
                .reduce("", (acc, c) -> c + acc);
    }
}