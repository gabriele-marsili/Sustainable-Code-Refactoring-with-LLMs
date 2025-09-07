public class BankAccountActionInvalidException extends Exception {

    BankAccountActionInvalidException(String message) {
        super(message);
    }
    
    BankAccountActionInvalidException(String message, Throwable cause) {
        super(message, cause);
    }
    
    BankAccountActionInvalidException(Throwable cause) {
        super(cause);
    }
}