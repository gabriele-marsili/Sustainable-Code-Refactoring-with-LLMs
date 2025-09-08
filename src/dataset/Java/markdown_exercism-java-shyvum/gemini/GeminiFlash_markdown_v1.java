class Markdown {

    String parse(String markdown) {
        StringBuilder result = new StringBuilder();
        boolean activeList = false;
        String[] lines = markdown.split("\n");

        for (String line : lines) {
            String theLine = parseLine(line);

            if (theLine.startsWith("<li>") && !theLine.startsWith("<h") && !theLine.startsWith("<p") && !activeList) {
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
        String header = parseHeader(line);
        if (header != null) {
            return header;
        }

        String listItem = parseListItem(line);
        if (listItem != null) {
            return listItem;
        }

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

        return "<h" + count + ">" + markdown.substring(count).trim() + "</h" + count + ">";
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

        int index = workingOn.indexOf("__");
        if (index != -1) {
            int endIndex = workingOn.indexOf("__", index + 2);
            if (endIndex != -1) {
                workingOn = workingOn.substring(0, index) + "<strong>" + workingOn.substring(index + 2, endIndex) + "</strong>" + workingOn.substring(endIndex + 2);
            }
        }

        index = workingOn.indexOf("_");
        if (index != -1) {
            int endIndex = workingOn.indexOf("_", index + 1);
            if (endIndex != -1) {
                workingOn = workingOn.substring(0, index) + "<em>" + workingOn.substring(index + 1, endIndex) + "</em>" + workingOn.substring(endIndex + 1);
            }
        }

        return workingOn;
    }
}