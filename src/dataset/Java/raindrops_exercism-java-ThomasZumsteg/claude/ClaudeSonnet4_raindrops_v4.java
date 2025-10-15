public class Raindrops {
    static String convert(Integer num) {
        int n = num.intValue();
        StringBuilder sounds = new StringBuilder();
        
        if (n % 3 == 0)
            sounds.append("Pling");
        if (n % 5 == 0)
            sounds.append("Plang");
        if (n % 7 == 0)
            sounds.append("Plong");
        
        return sounds.length() == 0 ? num.toString() : sounds.toString();
    }
}