class Markdown {

    String parse(String markdown) {
        String[] lines = markdown.split("\n");
        StringBuilder result = new StringBuilder();
        boolean activeList = false;

        for (String line : lines) {
            String theLine = parseHeader(line);

            if (theLine == null) {
                theLine = parseListItem(line);
            }

            if (theLine == null) {
                theLine = parseParagraph(line);
            }

            if (theLine.startsWith("<li>") && !activeList) {
                activeList = true;
                result.append("<ul>").append(theLine);
            } else if (!theLine.startsWith("<li>") && activeList) {
                activeList = false;
                result.append("</ul>").append(theLine);
            } else {
                result.append(theLine);
            }
        }

        if (activeList) {
            result.append("</ul>");
        }

        return result.toString();
    }

    private String parseHeader(String markdown) {
        int count = 0;
        int length = markdown.length();

        while (count < length && markdown.charAt(count) == '#') {
            count++;
        }

        if (count == 0) {
            return null;
        }

        return "<h" + count + ">" + markdown.substring(count + 1) + "</h" + count + ">";
    }

    private String parseListItem(String markdown) {
        if (markdown.startsWith("*")) {
            String skipAsterisk = markdown.substring(2);
            String listItemString = parseSomeSymbols(skipAsterisk);
            return "<li>" + listItemString + "</li>";
        }

        return null;
    }

    private String parseParagraph(String markdown) {
        return "<p>" + parseSomeSymbols(markdown) + "</p>";
    }

    private String parseSomeSymbols(String markdown) {
        return markdown.replaceAll("__(.+)__", "<strong>$1</strong>")
                      .replaceAll("_(.+)_", "<em>$1</em>");
    }
}