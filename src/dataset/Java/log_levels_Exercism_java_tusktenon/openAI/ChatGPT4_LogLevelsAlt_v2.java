public class LogLevelsAlt {

    public static String message(String logLine) {
        int separatorIndex = logLine.indexOf("]:");
        return logLine.substring(separatorIndex + 2).trim();
    }

    public static String logLevel(String logLine) {
        int startIndex = logLine.indexOf('[') + 1;
        int endIndex = logLine.indexOf(']');
        return logLine.substring(startIndex, endIndex).toLowerCase();
    }

    public static String reformat(String logLine) {
        int separatorIndex = logLine.indexOf("]:");
        String message = logLine.substring(separatorIndex + 2).trim();
        int startIndex = logLine.indexOf('[') + 1;
        int endIndex = logLine.indexOf(']');
        String logLevel = logLine.substring(startIndex, endIndex).toLowerCase();
        return message + " (" + logLevel + ")";
    }
}