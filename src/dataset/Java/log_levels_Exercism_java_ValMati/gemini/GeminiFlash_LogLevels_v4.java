public class LogLevels {

    public static String message(String logLine) {
        int colonIndex = logLine.indexOf(':');
        return (colonIndex == -1) ? "" : logLine.substring(colonIndex + 1).trim();
    }

    public static String logLevel(String logLine) {
        int startIndex = 1;
        int endIndex = logLine.indexOf(']');
        return (endIndex <= startIndex) ? "" : logLine.substring(startIndex, endIndex).toLowerCase();
    }

    public static String reformat(String logLine) {
        String message = message(logLine);
        String logLevel = logLevel(logLine);
        return message + " (" + logLevel + ")";
    }
}