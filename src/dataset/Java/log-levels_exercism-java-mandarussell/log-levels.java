public class LogLevels {
    
    public static String message(String logLine) {
        String[] messageStrings = logLine.split(":", 2);
        return messageStrings[1].trim();
    }

    public static String logLevel(String logLine) {
        String level = logLine.substring(1, logLine.indexOf("]"));
        return level.toLowerCase();
    }

    public static String reformat(String logLine) {
        String[] messageStrings = logLine.split(":", 2);
        String level = logLine.substring(1, logLine.indexOf("]"));
        return messageStrings[1].trim() + " (" + level.toLowerCase() + ")";
    }
}
