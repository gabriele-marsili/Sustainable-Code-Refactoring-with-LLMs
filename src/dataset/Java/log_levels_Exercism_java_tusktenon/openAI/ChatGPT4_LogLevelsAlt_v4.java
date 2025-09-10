public class LogLevelsAlt {

    public static String message(String logLine) {
        int splitIndex = logLine.indexOf("]:");
        return logLine.substring(splitIndex + 2).trim();
    }

    public static String logLevel(String logLine) {
        int startIndex = logLine.indexOf('[') + 1;
        int endIndex = logLine.indexOf(']');
        return logLine.substring(startIndex, endIndex).toLowerCase();
    }

    public static String reformat(String logLine) {
        int splitIndex = logLine.indexOf("]:");
        String message = logLine.substring(splitIndex + 2).trim();
        int startIndex = logLine.indexOf('[') + 1;
        String logLevel = logLine.substring(startIndex, splitIndex - 1).toLowerCase();
        return message + " (" + logLevel + ")";
    }
}