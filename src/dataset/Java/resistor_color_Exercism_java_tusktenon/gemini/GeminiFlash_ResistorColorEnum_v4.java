import java.util.Arrays;

class ResistorColorEnum {
  private static final String[] COLORS = {"black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"};

  int colorCode(String color) {
    for (int i = 0; i < COLORS.length; i++) {
      if (COLORS[i].equals(color)) {
        return i;
      }
    }
    return -1; // Or throw an exception if the color is not found
  }

  String[] colors() {
    return Arrays.copyOf(COLORS, COLORS.length);
  }
}