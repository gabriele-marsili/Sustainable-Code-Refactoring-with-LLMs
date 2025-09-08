class Markdown {

    String parse(String markdown) {
        String[] lines = markdown.split("\n");
        StringBuilder result = new StringBuilder();
        boolean activeList = false;

        for (String line : lines) {
            String theLine = parseLine(line);

            if (theLine.startsWith("<li>") && !theLine.startsWith("<h") && !theLine.startsWith("<p>") && !activeList) {
                activeList = true;
                result.append("<ul>");
                result.append(theLine);
            } else if (!theLine.startsWith("<li>") && activeList) {
                activeList = false;
                result.append("</ul>");
                result.append(theLine);
            } else {
                result.append(theLine);
            }
        }

        if (activeList) {
            result.append("</ul>");
        }

        return result.toString();
    }

    private String parseLine(String line) {
        String theLine = parseHeader(line);
        if (theLine != null) return theLine;

        theLine = parseListItem(line);
        if (theLine != null) return theLine;

        return parseParagraph(line);
    }

    private String parseHeader(String markdown) {
        int count = 0;
        int len = markdown.length();

        while (count < len && markdown.charAt(count) == '#') {
            count++;
        }

        if (count == 0) {
            return null;
        }

        String headerContent = markdown.substring(count).trim();
        return "<h" + count + ">" + headerContent + "</h" + count + ">";
    }

    private String parseListItem(String markdown) {
        if (markdown.startsWith("* ")) {
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
        String workingOn = markdown;
        workingOn = replaceStrong(workingOn);
        workingOn = replaceEmphasis(workingOn);
        return workingOn;
    }

    private String replaceStrong(String markdown) {
        int start = markdown.indexOf("__");
        if (start == -1) return markdown;

        int end = markdown.indexOf("__", start + 2);
        if (end == -1) return markdown;

        String content = markdown.substring(start + 2, end);
        String replacement = "<strong>" + content + "</strong>";

        return markdown.substring(0, start) + replacement + markdown.substring(end + 2);
    }

    private String replaceEmphasis(String markdown) {
        int start = markdown.indexOf("_");
        if (start == -1) return markdown;

        int end = markdown.indexOf("_", start + 1);
        if (end == -1) return markdown;

        String content = markdown.substring(start + 1, end);
        String replacement = "<em>" + content + "</em>";

        return markdown.substring(0, start) + replacement + markdown.substring(end + 1);
    }
}