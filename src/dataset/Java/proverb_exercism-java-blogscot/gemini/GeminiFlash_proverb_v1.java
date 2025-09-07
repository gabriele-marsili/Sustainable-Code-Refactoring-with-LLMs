class Proverb {
  private final String proverb;

  Proverb(String[] words) {
    if (words.length > 0) {
      StringBuilder builder = new StringBuilder();
      String firstWord = words[0];

      for (int i = 1; i < words.length; i++) {
        builder.append("For want of a ")
            .append(words[i - 1])
            .append(" the ")
            .append(words[i])
            .append(" was lost.\n");
      }

      builder.append("And all for the want of a ")
          .append(firstWord)
          .append(".");

      this.proverb = builder.toString();
    } else {
      this.proverb = "";
    }
  }

  String recite() {
    return proverb;
  }
}