class AnnalynsInfiltration {
  public static boolean canFastAttack(boolean knightIsAwake) {
    return !knightIsAwake;
  }

  public static boolean canSpy(boolean... charactersAwake) {
    for (boolean isAwake : charactersAwake) {
      if (isAwake) return true;
    }
    return false;
  }

  public static boolean canSignalPrisoner(boolean archerIsAwake, boolean prisonerIsAwake) {
    return prisonerIsAwake && !archerIsAwake;
  }

  public static boolean canFreePrisoner(
      boolean knightIsAwake,
      boolean archerIsAwake,
      boolean prisonerIsAwake,
      boolean petDogIsPresent) {
    return petDogIsPresent ? !archerIsAwake : prisonerIsAwake && !knightIsAwake && !archerIsAwake;
  }
}