package wordcount;
import org.junit.Test;

import wordcount.WordCount;

import java.lang.Integer;
import java.lang.String;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.*;

public class WordCountTest {

    private final WordCount wordCount = new WordCount();

    @Test
    public void test_parse_ValidString_ReturnsExpectedResult() {
    	String input = "foo bar";
    	List<String> expected = new ArrayList<String>();
    	expected.add( "foo" );
    	expected.add( "bar" );
    	
    	List<String> actual = wordCount.parse( input );
    	assertEquals(expected.size( ), actual.size( ) );
    	
    	for ( int i = 0 ; i < expected.size( ) ; i++ ) {
    		assertTrue( expected.get( i ).equals( actual.get( i ) ) );
    	}
    }
    
    @Test
    public void test_parse_ValidString_ContainsDigits_ReturnsExpectedResult() {
    	String input = "foo11 bar99 100";
    	List<String> expected = new ArrayList<String>();
    	expected.add( "foo11" );
    	expected.add( "bar99" );
    	expected.add( "100" );
    	
    	List<String> actual = wordCount.parse( input );
    	assertEquals(expected.size( ), actual.size( ) );
    	
    	for ( int i = 0 ; i < expected.size( ) ; i++ ) {
    		assertTrue( expected.get( i ).equals( actual.get( i ) ) );
    	}
    }
    
    @Test
    public void test_parse_ValidString_ContainsPunctuation_ReturnsExpectedResult() {
    	String input = "foo11&& b::ar99 1..00 &#*$(";
    	List<String> expected = new ArrayList<String>();
    	expected.add( "foo11" );
    	expected.add( "bar99" );
    	expected.add( "100" );
    	
    	List<String> actual = wordCount.parse( input );
    	assertEquals(expected.size( ), actual.size( ) );
    	
    	for ( int i = 0 ; i < expected.size( ) ; i++ ) {
    		assertTrue( expected.get( i ).equals( actual.get( i ) ) );
    	}
    }
    
    @Test
    public void handleNullString() {
    	try {
    		wordCount.phrase( null );
    		fail("Supposed to catch NullPointerException");
    	} catch ( NullPointerException npe ) {
    		
    	} catch ( Exception e ) {
    		fail("Expected to catch NullPointerException");
    	}
    }
    
    @Test
    public void handleEmptyString() {
    	Map<String, Integer> actualWordCount = new HashMap<String, Integer>();
    	final Map<String, Integer> expectedWordCount = new HashMap<String, Integer>();
    	
    	actualWordCount = wordCount.phrase("");
    	assertEquals(
                expectedWordCount, actualWordCount
        );
    }
    
    @Test
    public void countOneWord() {
        Map<String, Integer> actualWordCount = new HashMap<String, Integer>();
        final Map<String, Integer> expectedWordCount = new HashMap<String, Integer>();
        expectedWordCount.put("word", 1);

        actualWordCount = wordCount.phrase("word");
        assertEquals(
            expectedWordCount, actualWordCount
        );
    }

    @Test
    public void countOneOfEach() {
        Map<String, Integer> actualWordCount = new HashMap<String, Integer>();
        final Map<String, Integer> expectedWordCount = new HashMap<String, Integer>();
        expectedWordCount.put("one", 1);
        expectedWordCount.put("of", 1);
        expectedWordCount.put("each", 1);

        actualWordCount = wordCount.phrase("one of each");
        assertEquals(
            expectedWordCount, actualWordCount
        );
    }

    @Test
    public void countMultipleOccurences() {
        Map<String, Integer> actualWordCount = new HashMap<String, Integer>();
        final Map<String, Integer> expectedWordCount = new HashMap<String, Integer>();
        expectedWordCount.put("one", 1);
        expectedWordCount.put("fish", 4);
        expectedWordCount.put("two", 1);
        expectedWordCount.put("red", 1);
        expectedWordCount.put("blue", 1);

        actualWordCount = wordCount.phrase("one fish two fish red fish blue fish");
        assertEquals(
            expectedWordCount, actualWordCount
        );
    }

    @Test
    public void ignorePunctuation() {
        Map<String, Integer> actualWordCount = new HashMap<String, Integer>();
        final Map<String, Integer> expectedWordCount = new HashMap<String, Integer>();
        expectedWordCount.put("car", 1);
        expectedWordCount.put("carpet", 1);
        expectedWordCount.put("as", 1);
        expectedWordCount.put("java", 1);
        expectedWordCount.put("javascript", 1);

        actualWordCount = wordCount.phrase("car : carpet as java : javascript!!&@$%^&");
        assertEquals(
            expectedWordCount, actualWordCount
        );

    }

    @Test
    public void includeNumbers() {
        Map<String, Integer> actualWordCount = new HashMap<String, Integer>();
        final Map<String, Integer> expectedWordCount = new HashMap<String, Integer>();
        expectedWordCount.put("testing", 2);
        expectedWordCount.put("1", 1);
        expectedWordCount.put("2", 1);

        actualWordCount = wordCount.phrase("testing, 1, 2 testing");
        assertEquals(
            expectedWordCount, actualWordCount
        );
    }

    @Test
    public void normalizeCase() {
        Map<String, Integer> actualWordCount = new HashMap<String, Integer>();
        final Map<String, Integer> expectedWordCount = new HashMap<String, Integer>();
        expectedWordCount.put("go", 3);

        actualWordCount = wordCount.phrase("go Go GO");
        assertEquals(
            expectedWordCount, actualWordCount
        );
    }

}
