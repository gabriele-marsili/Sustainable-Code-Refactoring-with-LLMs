public class LogLevels {

    public static String message(String logLine) {
        int colonIndex = logLine.indexOf(":");
        if (colonIndex == -1) {
            return ""; // Or handle the error as appropriate
        }
        return logLine.substring(colonIndex + 1).trim();
    }

    public static String logLevel(String logLine) {
        int startIndex = 1;
        int endIndex = logLine.indexOf("]");

        if (endIndex <= startIndex) {
            return ""; // Or handle the error as appropriate
        }

        return logLine.substring(startIndex, endIndex).toLowerCase();
    }

    public static String reformat(String logLine) {
        String message = message(logLine);
        String logLevel = logLevel(logLine);
        return message + " (" + logLevel + ")";
    }
}