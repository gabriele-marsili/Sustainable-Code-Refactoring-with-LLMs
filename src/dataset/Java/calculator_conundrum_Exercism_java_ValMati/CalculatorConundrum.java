class CalculatorConundrum {

    public String calculate(int operand1, int operand2, String operation) {
        int result = getResult(operand1, operand2, operation);
        return String.format("%d %s %d = %d", operand1, operation, operand2, result);
    }

    private int getResult(int operand1, int operand2, String operation) {

        validateOperation(operation);

        return switch (operation) {
            case "+" -> operand1 + operand2;
            case "*" -> operand1 * operand2;
            case "/" -> {
                try {
                    yield operand1 / operand2;
                } catch (Exception ex) {
                    throw new IllegalOperationException("Division by zero is not allowed", ex);
                }
            }
            default -> throw new IllegalOperationException(String.format("Operation '%s' does not exist", operation));
        };
    }
    
    private static void validateOperation(String operation) {
        if (operation == null) {
            throw new IllegalArgumentException("Operation cannot be null");
        }

        if (operation.isEmpty()) {
            throw new IllegalArgumentException("Operation cannot be empty");
        }
    }
}
