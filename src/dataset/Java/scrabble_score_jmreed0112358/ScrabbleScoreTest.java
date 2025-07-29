package scrabblescore;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class ScrabbleScoreTest {

    private final String[] input = {"", " \t\n", null, "a", "f", "street", "quirky", "OXYPHENBUTAZONE", "alacrity", "alacrity foo" };
    private final Integer[] output = { 0, 0, 0, 1, 4, 6, 22, 41, 13, 13 };
    
    @Test
    public void test() {
       Scrabble test;
       
       for ( int i = 0 ; i < input.length ; i++ ) {
    	   test = new Scrabble( input[i] );
    	   assertEquals( output[i], test.getScore( ) );
       }
    }
}
