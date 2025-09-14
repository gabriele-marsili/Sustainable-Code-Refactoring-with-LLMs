public class Blackjack {
    
    private static final int[] CARD_VALUES = new int[128];
    
    static {
        CARD_VALUES['a'] = 11; // ace
        CARD_VALUES['t'] = 2;  // two
        CARD_VALUES['h'] = 3;  // three
        CARD_VALUES['f'] = 4;  // four
        CARD_VALUES['i'] = 5;  // five
        CARD_VALUES['s'] = 6;  // six
        CARD_VALUES['e'] = 7;  // seven
        CARD_VALUES['g'] = 8;  // eight
        CARD_VALUES['n'] = 9;  // nine
        CARD_VALUES['j'] = 10; // jack
        CARD_VALUES['q'] = 10; // queen
        CARD_VALUES['k'] = 10; // king
    }

    public int parseCard(String card) {
        if (card.equals("ten")) return 10;
        return card.isEmpty() ? 0 : CARD_VALUES[card.charAt(0)];
    }

    public boolean isBlackjack(String card1, String card2) {
        return parseCard(card1) + parseCard(card2) == 21;
    }

    public String largeHand(boolean isBlackjack, int dealerScore) {
        return !isBlackjack ? "P" : dealerScore > 9 ? "S" : "W";
    }

    public String smallHand(int handScore, int dealerScore) {
        return handScore > 16 ? "S"
                : handScore < 12 ? "H"
                : dealerScore < 7 ? "S" : "H";
    }

    public String firstTurn(String card1, String card2, String dealerCard) {
        int handScore = parseCard(card1) + parseCard(card2);
        int dealerScore = parseCard(dealerCard);

        if (20 < handScore)
            return largeHand(isBlackjack(card1, card2), dealerScore);

        else
            return smallHand(handScore, dealerScore);
    }
}