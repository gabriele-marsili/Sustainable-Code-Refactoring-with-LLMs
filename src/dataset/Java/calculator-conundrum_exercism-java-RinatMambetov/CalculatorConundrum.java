class CalculatorConundrum {
    public String calculate(int operand1, int operand2, String operation) {
        if (operation == null) {
            throw new IllegalArgumentException("Operation cannot be null");
        }
        if (operation.isEmpty()) {
            throw new IllegalArgumentException("Operation cannot be empty");
        }

        String result;
        switch (operation) {
            case "+" -> result = operand1 + " + " + operand2 + " = " + (operand1 + operand2);
            case "*" -> result = operand1 + " * " + operand2 + " = " + (operand1 * operand2);
            case "/" -> {
                if (operand2 == 0) {
                    throw new IllegalOperationException("Division by zero is not allowed", new ArithmeticException());
                }
                result = operand1 + " / " + operand2 + " = " + (operand1 / operand2);
            }
            default -> throw new IllegalOperationException("Operation '" + operation + "' does not exist");
        }
        return result;
    }
}
