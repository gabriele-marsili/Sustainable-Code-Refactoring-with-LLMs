public class BankAccountActionInvalidException extends Exception {

    private static final long serialVersionUID = 1L;

    BankAccountActionInvalidException(String message) {
        super(message);
    }
}