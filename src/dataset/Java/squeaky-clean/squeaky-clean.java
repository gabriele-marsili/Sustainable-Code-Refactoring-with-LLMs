class SqueakyClean {

    // Replace spaces with underscores:
    private static String replaceSpaces(String identifier) {
        String returnString = identifier.replace(' ', '_');
        return returnString;
    }

    // Replace kebab-case with camelCase:
    private static String camelCase(String identifier) {
        StringBuilder returnString = new StringBuilder();
        boolean isUpperCase = false;
        for (char ch : identifier.toCharArray()) {
            if (ch == '-') {
                isUpperCase = true;
                continue;
            }
            if (isUpperCase) {
                returnString.append(Character.toUpperCase(ch));   
                isUpperCase = false; 
            } else {
                returnString.append(ch);   
            }
        }
        return returnString.toString();
    }

    // Replace leetspeak with normal text:
    private static String replaceLeetSpeak(String identifier) {
        return identifier.replaceAll("0", "o")
            .replaceAll("1", "l")
            .replaceAll("3", "e")
            .replaceAll("4", "a")
            .replaceAll("7", "t");
    }

    // Remove chars that are not letters or underscores:
    private static String removeNonAlpha(String identifier) {
        return identifier.replaceAll("[^a-zA-Z_]", "");
    }

    static String clean(String identifier) {
        if (identifier != "") {
            identifier = SqueakyClean.replaceSpaces(identifier);
            identifier = SqueakyClean.camelCase(identifier);
            identifier = SqueakyClean.replaceLeetSpeak(identifier);
            identifier = SqueakyClean.removeNonAlpha(identifier);
        }
        return identifier;
    }
}
