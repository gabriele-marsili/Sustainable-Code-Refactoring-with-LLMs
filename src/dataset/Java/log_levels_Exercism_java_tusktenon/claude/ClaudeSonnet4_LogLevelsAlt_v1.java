public class LogLevelsAlt {
    
    public static String message(String logLine) {
        int colonIndex = logLine.indexOf("]:");
        return logLine.substring(colonIndex + 2).trim();
    }

    public static String logLevel(String logLine) {
        int startIndex = logLine.indexOf('[') + 1;
        int endIndex = logLine.indexOf(']');
        return logLine.substring(startIndex, endIndex).toLowerCase();
    }

    public static String reformat(String logLine) {
        int startIndex = logLine.indexOf('[') + 1;
        int endIndex = logLine.indexOf(']');
        int colonIndex = logLine.indexOf("]:");
        
        String level = logLine.substring(startIndex, endIndex).toLowerCase();
        String msg = logLine.substring(colonIndex + 2).trim();
        
        return msg + " (" + level + ")";
    }
}