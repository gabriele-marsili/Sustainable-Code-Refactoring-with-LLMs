package romanNumerals;

import java.util.*;

class Numerals
{
  private Map<String, String> denominations = new LinkedHashMap<String, String>();


  public Numerals()
  {
    denominations.put("1000", "M");
    denominations.put("900", "CM");
    denominations.put("500", "D");
    denominations.put("400", "CD");
    denominations.put("100", "C");
    denominations.put("90", "XC");
    denominations.put("50", "L");
    denominations.put("40", "XL");
    denominations.put("10", "X");
    denominations.put("9", "IX");
    denominations.put("5", "V");
    denominations.put("4", "IV");
    denominations.put("3", "III");
    denominations.put("2", "II");
    denominations.put("1", "I");
  }

  public String toRoman(int numberToChange)
  {
    String romans = "";
    while (numberToChange > 0) {
      outerloop:
      for ( String key : denominations.keySet() ){
        int currentDenomination = Integer.parseInt(key);
        if (numberToChange - currentDenomination >= 0){
          romans = romans + denominations.get(key);
          numberToChange = numberToChange - currentDenomination;
          break outerloop;
        }
      }
    }
    return romans;
  }
}
