import java.util.regex.Pattern;

public final class PhoneNumber {
    private static final Pattern LETTERS_PATTERN = Pattern.compile(".*\\p{Alpha}.*");
    private static final Pattern PUNCTUATION_PATTERN = Pattern.compile(".*[@:!].*");
    
    private final String number;

    public PhoneNumber(String number) {
        var digits = number.replaceAll("[-+.() ]", "");
        
        // Check for letters
        if (LETTERS_PATTERN.matcher(digits).matches()) {
            throw new IllegalArgumentException("letters not permitted");
        }
        
        // Check for punctuations
        if (PUNCTUATION_PATTERN.matcher(digits).matches()) {
            throw new IllegalArgumentException("punctuations not permitted");
        }
        
        int length = digits.length();
        
        // Check length constraints
        if (length > 11) {
            throw new IllegalArgumentException("must not be greater than 11 digits");
        }
        if (length < 10) {
            throw new IllegalArgumentException("must not be fewer than 10 digits");
        }
        
        // Check 11 digits must start with 1
        if (length == 11 && digits.charAt(0) != '1') {
            throw new IllegalArgumentException("11 digits must start with 1");
        }
        
        // Get area code position (skip country code if present)
        int areaCodeStart = length == 11 ? 1 : 0;
        char areaCodeFirst = digits.charAt(areaCodeStart);
        
        // Check area code constraints
        if (areaCodeFirst == '0') {
            throw new IllegalArgumentException("area code cannot start with zero");
        }
        if (areaCodeFirst == '1') {
            throw new IllegalArgumentException("area code cannot start with one");
        }
        
        // Check exchange code constraints
        char exchangeCodeFirst = digits.charAt(areaCodeStart + 3);
        if (exchangeCodeFirst == '0') {
            throw new IllegalArgumentException("exchange code cannot start with zero");
        }
        if (exchangeCodeFirst == '1') {
            throw new IllegalArgumentException("exchange code cannot start with one");
        }
        
        this.number = digits.substring(length - 10);
    }

    public String getNumber() {
        return number;
    }
}