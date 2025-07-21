public class Raindrops {
    static String convert(Integer num) {
        StringBuilder sounds = new StringBuilder();

        if (num % 3 == 0) {
            sounds.append("Pling");
        }
        if (num % 5 == 0) {
            sounds.append("Plang");
        }
        if (num % 7 == 0) {
            sounds.append("Plong");
        }

        if (sounds.length() == 0) {
            return num.toString();
        } else {
            return sounds.toString();
        }
    }
}