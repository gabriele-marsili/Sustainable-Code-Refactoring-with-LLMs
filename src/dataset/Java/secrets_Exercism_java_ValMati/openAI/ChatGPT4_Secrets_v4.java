public class Secrets {
    public static int shiftBack(int value, int amount) {
        return value >>> amount; // Bitwise operations are already optimal
    }

    public static int setBits(int value, int mask) {
        return value | mask; // Bitwise OR is already optimal
    }

    public static int flipBits(int value, int mask) {
        return value ^ mask; // Bitwise XOR is already optimal
    }

    public static int clearBits(int value, int mask) {
        return value & ~mask; // Bitwise AND with NOT is already optimal
    }
}