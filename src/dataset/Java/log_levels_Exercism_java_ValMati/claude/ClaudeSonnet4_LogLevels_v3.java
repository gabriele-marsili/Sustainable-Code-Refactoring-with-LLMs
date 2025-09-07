public class LogLevels {

    public static String message(String logLine) {
        int colonIndex = logLine.indexOf(':');
        if (colonIndex == -1) return "";
        
        int start = colonIndex + 1;
        int end = logLine.length();
        
        while (start < end && logLine.charAt(start) == ' ') {
            start++;
        }
        while (end > start && logLine.charAt(end - 1) == ' ') {
            end--;
        }
        
        return logLine.substring(start, end);
    }

    public static String logLevel(String logLine) {
        int endIndex = logLine.indexOf(']');
        if (endIndex == -1) return "";
        
        StringBuilder result = new StringBuilder(endIndex - 1);
        for (int i = 1; i < endIndex; i++) {
            char c = logLine.charAt(i);
            result.append(c >= 'A' && c <= 'Z' ? (char)(c + 32) : c);
        }
        return result.toString();
    }

    public static String reformat(String logLine) {
        int colonIndex = logLine.indexOf(':');
        int bracketIndex = logLine.indexOf(']');
        
        if (colonIndex == -1 || bracketIndex == -1) return "";
        
        int messageStart = colonIndex + 1;
        int messageEnd = logLine.length();
        
        while (messageStart < messageEnd && logLine.charAt(messageStart) == ' ') {
            messageStart++;
        }
        while (messageEnd > messageStart && logLine.charAt(messageEnd - 1) == ' ') {
            messageEnd--;
        }
        
        StringBuilder result = new StringBuilder(logLine.length());
        result.append(logLine, messageStart, messageEnd);
        result.append(" (");
        
        for (int i = 1; i < bracketIndex; i++) {
            char c = logLine.charAt(i);
            result.append(c >= 'A' && c <= 'Z' ? (char)(c + 32) : c);
        }
        
        result.append(')');
        return result.toString();
    }
}