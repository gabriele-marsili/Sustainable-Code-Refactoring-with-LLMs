class Bob {

    String hey(String input) {
        input = input.trim();
        boolean isQuestion = input.endsWith("?");
        boolean isYell = true;
        boolean hasLetter = false;
        for (int letter = 0; letter < input.length(); letter++) {
            char ch = input.charAt(letter);
            if (Character.isLetter(ch)) {
                hasLetter = true;
            }
            if (Character.isLowerCase(ch)) {
                isYell = false;
                break;
            }
        }
        if (!hasLetter) {
            isYell = false;
        }
        boolean isSilence = input.isBlank();
        String result;
        if (isYell && isQuestion) {
            result = "Calm down, I know what I'm doing!";
        } else if (isYell) {
            result = "Whoa, chill out!";
        } else if (isQuestion) {
            result = "Sure.";
        } else if (isSilence) {
            result = "Fine. Be that way!";
        } else {
            result = "Whatever.";
        }
        return result;
    }

}