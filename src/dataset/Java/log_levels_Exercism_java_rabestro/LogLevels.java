public class LogLevels {

    public static String message(String logLine) {
        int colonIndex = logLine.indexOf(':');
        return logLine.substring(colonIndex + 1).trim();
    }

    public static String logLevel(String logLine) {
        int closeBracketIndex = logLine.indexOf(']');
        return logLine.substring(1, closeBracketIndex).toLowerCase();
    }

    public static String reformat(String logLine) {
        int colonIndex = logLine.indexOf(':');
        int closeBracketIndex = logLine.indexOf(']');
        
        String message = logLine.substring(colonIndex + 1).trim();
        String level = logLine.substring(1, closeBracketIndex).toLowerCase();
        
        return message + " (" + level + ")";
    }

}