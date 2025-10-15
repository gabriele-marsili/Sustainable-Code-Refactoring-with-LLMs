import java.util.ArrayList;

class PigLatinTranslator {
    public String translate(String starterWord) {
        String[] words = starterWord.split(" ");
        ArrayList<String> newWords = new ArrayList<>();
        for (String word : words) {
            String startVovelPattern = "^[aeiou].*";
            String startVovelSoundPattern = "^xr.*|^yt.*";
            String startThreeConsonantPattern = "^squ.*|^thr.*|^sch.*";
            String startTwoConsonantPattern = "^ch.*|^qu.*|^th.*|^rh.*";
            String startConsonantPattern = "^[pkxqymfr].*";
            if (word.matches(startVovelPattern) || word.matches(startVovelSoundPattern)) {
                word += "ay";
            } else if (word.matches(startThreeConsonantPattern)) {
                word = word.substring(3) + word.substring(0, 3) + "ay";
            } else if (word.matches(startTwoConsonantPattern)) {
                word = word.substring(2) + word.substring(0, 2) + "ay";
            } else if (word.matches(startConsonantPattern)) {
                word = word.substring(1) + word.charAt(0) + "ay";
            }
            newWords.add(word);
        }
        return String.join(" ", newWords);
    }
}