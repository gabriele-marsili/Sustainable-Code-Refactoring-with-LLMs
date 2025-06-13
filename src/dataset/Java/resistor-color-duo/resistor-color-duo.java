class ResistorColorDuo {
    int value(String[] colors) {
        String[] colorBand = new String[] {"black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"};
        int val = 0;
        for (int i = 0; i < colorBand.length; i++) {
            if (colors[0] == colorBand[i]) {
                val += i * 10;
            }
            if (colors[1] == colorBand[i]) {
                val += i;
            }
        }
        return val;
    }
}
