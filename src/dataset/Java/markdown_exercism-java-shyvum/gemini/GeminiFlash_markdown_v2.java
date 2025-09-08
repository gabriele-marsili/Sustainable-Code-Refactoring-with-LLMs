class Markdown {

    String parse(String markdown) {
        String[] lines = markdown.split("\n");
        StringBuilder result = new StringBuilder();
        boolean activeList = false;

        for (String line : lines) {
            String theLine = null;

            if (line.startsWith("#")) {
                theLine = parseHeader(line);
            } else if (line.startsWith("*")) {
                theLine = parseListItem(line);
            } else {
                theLine = parseParagraph(line);
            }

            if (theLine != null && theLine.startsWith("<li>") && !theLine.startsWith("<h") && !theLine.startsWith("<p>") && !activeList) {
                activeList = true;
                result.append("<ul>");
                result.append(theLine);
            } else if (theLine != null && !theLine.startsWith("<li>") && activeList) {
                activeList = false;
                result.append("</ul>");
                result.append(theLine);
            } else {
                if (theLine != null) {
                    result.append(theLine);
                }
            }
        }

        if (activeList) {
            result.append("</ul>");
        }

        return result.toString();
    }

    private String parseHeader(String markdown) {
        int count = 0;
        while (count < markdown.length() && markdown.charAt(count) == '#') {
            count++;
        }

        if (count == 0) {
            return null;
        }

        String headerText = markdown.substring(count).trim();
        return "<h" + count + ">" + headerText + "</h" + count + ">";
    }

    private String parseListItem(String markdown) {
        if (markdown.startsWith("*")) {
            String skipAsterisk = markdown.substring(1).trim();
            String listItemString = parseSomeSymbols(skipAsterisk);
            return "<li>" + listItemString + "</li>";
        }

        return null;
    }

    private String parseParagraph(String markdown) {
        return "<p>" + parseSomeSymbols(markdown) + "</p>";
    }

    private String parseSomeSymbols(String markdown) {
        String workingOn = markdown;
        workingOn = workingOn.replaceAll("__(.+?)__", "<strong>$1</strong>");
        workingOn = workingOn.replaceAll("_(.+?)_", "<em>$1</em>");
        return workingOn;
    }
}