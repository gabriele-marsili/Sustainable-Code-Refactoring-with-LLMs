package romanNumerals;

class Tests
{
  public static void main (String[] args)
  {
    TestTools myTests = new TestTools();
    Numerals numerals = new Numerals();
    myTests.compareStrings("1 should be I", "I", numerals.toRoman(1));
    myTests.compareStrings("2 should be II", "II", numerals.toRoman(2));
    myTests.compareStrings("3 should be III", "III", numerals.toRoman(3));
    myTests.compareStrings("4 should be IV", "IV", numerals.toRoman(4));
    myTests.compareStrings("5 should be V", "V", numerals.toRoman(5));
    myTests.compareStrings("6 should be VI", "VI", numerals.toRoman(6));
    myTests.compareStrings("9 should be IX", "IX", numerals.toRoman(9));
    myTests.compareStrings("27 should be XXVII", "XXVII", numerals.toRoman(27));
    myTests.compareStrings("48 should be XLVIII", "XLVIII", numerals.toRoman(48));
    myTests.compareStrings("59 should be LIX", "LIX", numerals.toRoman(59));
    myTests.compareStrings("93 should be XCIII", "XCIII", numerals.toRoman(93));
    myTests.compareStrings("141 should be CXLI", "CXLI", numerals.toRoman(141));
    myTests.compareStrings("163 should be CLXIII", "CLXIII", numerals.toRoman(163));
    myTests.compareStrings("402 should be CDII", "CDII", numerals.toRoman(402));
    myTests.compareStrings("575 should be DLXXV", "DLXXV", numerals.toRoman(575));
    myTests.compareStrings("911 should be CMXI", "CMXI", numerals.toRoman(911));
    myTests.compareStrings("1024 should be MXXIV", "MXXIV", numerals.toRoman(1024));
    myTests.compareStrings("3000 should be MMM", "MMM", numerals.toRoman(3000));
  }
}
