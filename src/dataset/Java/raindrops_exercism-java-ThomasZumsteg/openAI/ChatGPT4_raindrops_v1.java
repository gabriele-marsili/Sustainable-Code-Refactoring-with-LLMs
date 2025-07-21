public class Raindrops {
    static String convert(Integer num) {
        StringBuilder sounds = new StringBuilder(8);
        if (num % 3 == 0) sounds.append("Pling");
        if (num % 5 == 0) sounds.append("Plang");
        if (num % 7 == 0) sounds.append("Plong");
        return sounds.length() > 0 ? sounds.toString() : num.toString();
    }
}
