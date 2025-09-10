public class LogLevelsAlt {

    public static String message(String logLine) {
        int index = logLine.indexOf("]:");
        return logLine.substring(index + 2).trim();
    }

    public static String logLevel(String logLine) {
        int index = logLine.indexOf("]:");
        return logLine.substring(1, index).toLowerCase();
    }

    public static String reformat(String logLine) {
        return String.format("%s (%s)", message(logLine), logLevel(logLine));
    }
}