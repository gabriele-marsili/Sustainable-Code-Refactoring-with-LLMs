public final class Secrets {
  public static int shiftBack(final int value, final int amount) {
    return value >>> amount;
  }

  public static int setBits(final int value, final int mask) {
    return value | mask;
  }

  public static int flipBits(final int value, final int mask) {
    return value ^ mask;
  }

  public static int clearBits(final int value, final int mask) {
    return value & ~mask;
  }
}