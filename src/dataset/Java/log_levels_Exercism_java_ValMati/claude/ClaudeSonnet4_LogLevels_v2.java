public class LogLevels {

    public static String message(String logLine) {
        int colonIndex = logLine.indexOf(':');
        return logLine.substring(colonIndex + 1).trim();
    }

    public static String logLevel(String logLine) {
        int endIndex = logLine.indexOf(']');
        return logLine.substring(1, endIndex).toLowerCase();
    }

    public static String reformat(String logLine) {
        int colonIndex = logLine.indexOf(':');
        int endIndex = logLine.indexOf(']');
        
        String message = logLine.substring(colonIndex + 1).trim();
        String logLevel = logLine.substring(1, endIndex).toLowerCase();
        
        return message + " (" + logLevel + ")";
    }
}