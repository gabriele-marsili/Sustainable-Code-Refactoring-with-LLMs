package romanNumerals;

class TestTools
{
  private static final String ANSI_RESET = "\u001B[0m";
  private static final String ANSI_GREEN = "\u001B[32m";
  private static final String ANSI_RED = "\u001B[31m";

  public TestTools()
  {
    System.out.println("Specs object created");
  }

  public static boolean compareStrings(String testName, String expected, String actual)
  {
    System.out.println("Test: " + testName);
    if (expected.equals(actual)){
      System.out.println(expected + " matches " + actual + ANSI_GREEN + " --Success--" + ANSI_RESET);
      return true;
    }
    else {
      System.out.println(expected + " does not match " + actual + ANSI_RED + " --Fail--" + ANSI_RESET);
      return false;
    }
  }
}
