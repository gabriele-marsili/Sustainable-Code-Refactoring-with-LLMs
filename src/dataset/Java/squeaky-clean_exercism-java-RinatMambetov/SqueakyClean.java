class SqueakyClean {
    static String clean(String identifier) {
        identifier = identifier.replace(" ", "_");
        identifier = identifier.replaceAll("\\p{Cntrl}", "CTRL");
        StringBuilder newStr = new StringBuilder();
        for (int i = 0; i < identifier.length(); i++) {
            if (identifier.charAt(i) == '-' && i != identifier.length() - 1) {
                i++;
                while (Character.isDigit(identifier.charAt(i))) {
                    i++;
                }
                newStr.append(Character.toUpperCase(identifier.charAt(i)));
            } else {
                newStr.append(identifier.charAt(i));
            }
        }
        identifier = newStr.toString();
        identifier = identifier.replaceAll("\\p{N}", "");
        identifier = identifier.replaceAll("[^\\p{L}\\p{P}\\p{Z}]", "");
        identifier = identifier.replaceAll("[α-ω]", "");
        return identifier;
    }
}
