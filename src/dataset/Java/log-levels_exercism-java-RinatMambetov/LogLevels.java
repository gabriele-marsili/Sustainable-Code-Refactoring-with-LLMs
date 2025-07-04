import java.util.Locale;

public class LogLevels {

    public static String message(String logLine) {
//        throw new UnsupportedOperationException("Please implement the (static) LogLine.message() method");
        return logLine.substring(logLine.indexOf(":") + 1).trim();
    }

    public static String logLevel(String logLine) {
//        throw new UnsupportedOperationException("Please implement the (static) LogLine.logLevel() method");
        return logLine.substring(logLine.indexOf("[") + 1, logLine.indexOf("]")).toLowerCase(Locale.ENGLISH);
    }

    public static String reformat(String logLine) {
//        throw new UnsupportedOperationException("Please implement the (static) LogLine.reformat() method");
        return message(logLine) + " (" + logLevel(logLine) + ")";
    }
}
