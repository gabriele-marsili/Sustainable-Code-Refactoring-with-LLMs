public class Raindrops {
    static String convert(int num) {
        StringBuilder sounds = new StringBuilder(15);
        
        if (num % 3 == 0) sounds.append("Pling");
        if (num % 5 == 0) sounds.append("Plang");
        if (num % 7 == 0) sounds.append("Plong");
        
        return sounds.length() == 0 ? String.valueOf(num) : sounds.toString();
    }
}