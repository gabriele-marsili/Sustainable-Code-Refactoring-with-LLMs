public class LogLevels {

    public static String message(String logLine) {
        var sepIndex = logLine.indexOf(':');
        return logLine.substring(sepIndex + 1).trim();
    }

    public static String logLevel(String logLine) {
        var sepIndex = logLine.indexOf(']');
        return logLine.substring(1, sepIndex).toLowerCase();
    }

    public static String reformat(String logLine) {
        return message(logLine) + " (" + logLevel(logLine) + ")";
    }
}
