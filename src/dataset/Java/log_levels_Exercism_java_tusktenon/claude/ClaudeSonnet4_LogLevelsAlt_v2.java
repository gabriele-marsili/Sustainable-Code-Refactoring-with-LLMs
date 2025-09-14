public class LogLevelsAlt {
    
    public static String message(String logLine) {
        int colonIndex = logLine.indexOf("]:");
        return logLine.substring(colonIndex + 2).trim();
    }

    public static String logLevel(String logLine) {
        int colonIndex = logLine.indexOf("]:");
        return logLine.substring(1, colonIndex).toLowerCase();
    }

    public static String reformat(String logLine) {
        int colonIndex = logLine.indexOf("]:");
        String msg = logLine.substring(colonIndex + 2).trim();
        String level = logLine.substring(1, colonIndex).toLowerCase();
        return msg + " (" + level + ")";
    }
}