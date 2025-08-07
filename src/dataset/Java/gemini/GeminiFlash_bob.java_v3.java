public class Bob {

  private static class TextAnalysis {
    boolean containsLetter = false;
    boolean containsLowercase = false;
    boolean endsWithQuestionMark = false;
    boolean effectiveLettersAreBlank = true; // True if the string filtered by [^\\w?] is empty
  }

  // Analyzes the input text in a single pass to gather all necessary information
  // required by the hey method's logic, avoiding intermediate string allocations.
  private TextAnalysis analyzeText(String text) {
    TextAnalysis analysis = new TextAnalysis();
    int lastMeaningfulCharIndex = -1; // Stores the index of the last character that is \w or ?

    for (int i = 0; i < text.length(); i++) {
      char c = text.charAt(i);

      // Check for characters that would remain after `replaceAll("([^\\w?])", "")`
      if (Character.isLetterOrDigit(c) || c == '_' || c == '?') {
        lastMeaningfulCharIndex = i; // This character is "meaningful"

        if (Character.isLetter(c)) {
          analysis.containsLetter = true;
          if (Character.isLowerCase(c)) {
            analysis.containsLowercase = true;
          }
        }
      }
    }

    // Determine `effectiveLettersAreBlank`: if no meaningful characters were found
    analysis.effectiveLettersAreBlank = (lastMeaningfulCharIndex == -1);

    // Determine `endsWithQuestionMark`: if the last meaningful character was '?'
    if (lastMeaningfulCharIndex != -1) {
      analysis.endsWithQuestionMark = (text.charAt(lastMeaningfulCharIndex) == '?');
    }

    return analysis;
  }

  // Determines if the 'meaningful' part of the text is shouting.
  // This function now operates on the pre-analyzed TextAnalysis object.
  private boolean isShouting(TextAnalysis analysis) {
    return analysis.containsLetter && !analysis.containsLowercase;
  }

  String hey(String text) {
    TextAnalysis analysis = analyzeText(text);

    boolean isShouting = isShouting(analysis);
    boolean endsWithQuestion = analysis.endsWithQuestionMark;
    boolean effectiveLettersAreBlank = analysis.effectiveLettersAreBlank;

    if (isShouting && endsWithQuestion) {
      return "Calm down, I know what I'm doing!";
    }
    if (isShouting) {
      return "Whoa, chill out!";
    }
    if (endsWithQuestion) {
      return "Sure.";
    }
    if (effectiveLettersAreBlank) {
      return "Fine. Be that way!";
    }
    return "Whatever.";
  }
}