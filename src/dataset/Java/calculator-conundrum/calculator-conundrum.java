class CalculatorConundrum {
    public String calculate(int operand1, int operand2, String operation) {
        switch (operation) {
            case "+":
                return String.format("%d + %d = %d", operand1, operand2, operand1 + operand2);
            case "*":
                return String.format("%d * %d = %d", operand1, operand2, operand1 * operand2);
            case "/":
                try {
                    int result = operand1 / operand2;
                    return String.format("%d / %d = %d", operand1, operand2, result);
                } catch (ArithmeticException e) {
                    throw new IllegalOperationException("Division by zero is not allowed", e);
                }
            case null:
                throw new IllegalArgumentException("Operation cannot be null");
            case "":
                throw new IllegalArgumentException("Operation cannot be empty");
            default:
                throw new IllegalOperationException(String.format("Operation '%s' does not exist", operation));
        }
    }
}
