import java.util.*;

public class OpticalCharacterReader {

    String parse(List arrayList) throws IllegalArgumentException {

        // Creating a HashMap
        HashMap<String, String> numberMapping = new HashMap<>();
        // Adding key-value pairs to a HashMap
        numberMapping.put((" _ ,| |,|_|,   "), "0");
        numberMapping.put(("   ,  |,  |,   "), "1");
        numberMapping.put((" _ , _|,|_ ,   "), "2");
        numberMapping.put((" _ , _|, _|,   "), "3");
        numberMapping.put(("   ,|_|,  |,   "), "4");
        numberMapping.put((" _ ,|_ , _|,   "), "5");
        numberMapping.put((" _ ,|_ ,|_|,   "), "6");
        numberMapping.put((" _ ,  |,  |,   "), "7");
        numberMapping.put((" _ ,|_|,|_|,   "), "8");
        numberMapping.put((" _ ,|_|, _|,   "), "9");

        StringBuilder result = new StringBuilder();
        if (arrayList.size() % 4 != 0) {
            throw new IllegalArgumentException("Number of input rows must be a positive multiple of 4");
        } else if (arrayList.get(0).toString().length() % 3 != 0) {
            throw new IllegalArgumentException("Number of input columns must be a positive multiple of 3");
        } else {
            int countRow = arrayList.size() / 4; // how many numbers we have on the row
            int coutnColo = arrayList.get(0).toString().length() / 3; // how many number we have on the coloum

            System.out.println("This is list size: "+arrayList.size());
            System.out.println("This is colo: "+coutnColo);
            System.out.println("This is row: "+countRow);
            if(countRow==1) {
                for (int i = 0; i < coutnColo; i++) {
                    LinkedList temp = new LinkedList();
                    for (int j = 0; j < arrayList.size(); j++) {

                        temp.add(arrayList.get(j).toString().substring(i * 3, i * 3 + 3));
                    }
                    result.append(checkMap(temp, numberMapping));
                }
            }else {
                for(int y=0;y<countRow;y++){
                    for (int i = 0; i < coutnColo; i++) {
                        LinkedList temp = new LinkedList();
                        for (int j = y*4; j < y*4+4; j++) {
                            temp.add(arrayList.get(j).toString().substring(i * 3, i * 3 + 3));
                        }
                        result.append(checkMap(temp, numberMapping));
                    }
                    if(y!=countRow-1){
                        result.append(",");
                    }

                }
            }
            return result.toString();

        }

    }

    String checkMap(List arrayList, HashMap<String, String> numberMapping) {
        String result = null;
        String commaSeparated = String.join(",", arrayList);
        for (String key : numberMapping.keySet()) {
            if (Objects.equals(key, commaSeparated)) {
                result = numberMapping.get(key);
            }
        }
        if (result==null){
            result = "?";
        }
        return result;
    }
}