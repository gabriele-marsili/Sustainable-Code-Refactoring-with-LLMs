import java.util.*;

public class OpticalCharacterReader {

    private static final Map<String, String> NUMBER_MAPPING = new HashMap<>();

    static {
        NUMBER_MAPPING.put(" _ ,| |,|_|,   ", "0");
        NUMBER_MAPPING.put("   ,  |,  |,   ", "1");
        NUMBER_MAPPING.put(" _ , _|,|_ ,   ", "2");
        NUMBER_MAPPING.put(" _ , _|, _|,   ", "3");
        NUMBER_MAPPING.put("   ,|_|,  |,   ", "4");
        NUMBER_MAPPING.put(" _ ,|_ , _|,   ", "5");
        NUMBER_MAPPING.put(" _ ,|_ ,|_|,   ", "6");
        NUMBER_MAPPING.put(" _ ,  |,  |,   ", "7");
        NUMBER_MAPPING.put(" _ ,|_|,|_|,   ", "8");
        NUMBER_MAPPING.put(" _ ,|_|, _|,   ", "9");
    }

    public String parse(List<String> arrayList) throws IllegalArgumentException {
        int numRows = arrayList.size();
        if (numRows % 4 != 0) {
            throw new IllegalArgumentException("Number of input rows must be a positive multiple of 4");
        }

        int rowLength = arrayList.get(0).length();
        if (rowLength % 3 != 0) {
            throw new IllegalArgumentException("Number of input columns must be a positive multiple of 3");
        }

        int numDigitsPerRow = rowLength / 3;
        int numRowsOfDigits = numRows / 4;

        StringBuilder result = new StringBuilder();

        for (int rowGroup = 0; rowGroup < numRowsOfDigits; rowGroup++) {
            for (int digitIndex = 0; digitIndex < numDigitsPerRow; digitIndex++) {
                StringBuilder digitPattern = new StringBuilder();
                for (int i = rowGroup * 4; i < rowGroup * 4 + 4; i++) {
                    digitPattern.append(arrayList.get(i).substring(digitIndex * 3, digitIndex * 3 + 3));
                    if (i < rowGroup * 4 + 3) {
                        digitPattern.append(",");
                    }
                }
                result.append(NUMBER_MAPPING.getOrDefault(digitPattern.toString(), "?"));
            }
            if (rowGroup < numRowsOfDigits - 1) {
                result.append(",");
            }
        }

        return result.toString();
    }
}