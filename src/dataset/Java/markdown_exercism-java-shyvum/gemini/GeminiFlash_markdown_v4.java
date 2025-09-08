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
            } else if (theLine != null){
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
        String skipAsterisk = markdown.substring(2);
        String listItemString = parseSomeSymbols(skipAsterisk);
        return "<li>" + listItemString + "</li>";
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