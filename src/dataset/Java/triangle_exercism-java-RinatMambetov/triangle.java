class Triangle {

    private final boolean CONDITION12;
    private final boolean CONDITION13;
    private final boolean CONDITION23;

    Triangle(double side1, double side2, double side3) throws TriangleException {
        if (side1 == 0 && side2 == 0 && side3 == 0) {
            throw new TriangleException();
        }
        if (side1 + side2 < side3 || side1 + side3 < side2 || side2 + side3 < side1) {
            throw new TriangleException();
        }
        final double DEVIATION = 1e-6;
        CONDITION12 = Math.abs(side1 - side2) < DEVIATION;
        CONDITION13 = Math.abs(side1 - side3) < DEVIATION;
        CONDITION23 = Math.abs(side2 - side3) < DEVIATION;
    }

    boolean isEquilateral() {
        return CONDITION12 && CONDITION13 && CONDITION23;
    }

    boolean isIsosceles() {
        return CONDITION12 || CONDITION13 || CONDITION23;
    }

    boolean isScalene() {
        return !isIsosceles();
    }
}
