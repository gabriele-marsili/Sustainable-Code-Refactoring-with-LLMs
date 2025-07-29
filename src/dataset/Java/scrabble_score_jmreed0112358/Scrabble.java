package scrabblescore;

import java.security.InvalidParameterException;
import java.util.HashMap;
import java.util.Map;

import exceptions.NotImplementedException;

public class Scrabble
{
	private Map<Character, Integer> scoreMap;
	private String word = null;
	
	public Scrabble( String input ) {
		this.scoreMap = new HashMap<Character, Integer>();
		this.initMap( );
		this.word = this.sanitize( input );
	}

	public Integer getScore() {
		if ( this.word == null || this.word.isEmpty( ) ) {
			return 0;
		} else {
			Integer totalScore = 0;
			
			for ( int i = 0 ; i < this.word.length( ) ; i++ ) {
				Integer score = this.scoreMap.get( Character.toUpperCase( this.word.charAt( i ) ) );
				if ( score != null ) {
					totalScore += score;
				} else {
					throw new InvalidParameterException();
				}
			}
			return totalScore;
		}
	}
	
	/**
	 * Loads scoreMap with appropriate values.
	 */
	private void initMap() {
		this.scoreMap.put( 'A', 1 );
		this.scoreMap.put( 'E', 1 );
		this.scoreMap.put( 'I', 1 );
		this.scoreMap.put( 'O', 1 );
		this.scoreMap.put( 'U', 1 );
		this.scoreMap.put( 'L', 1 );
		this.scoreMap.put( 'N', 1 );
		this.scoreMap.put( 'R', 1 );
		this.scoreMap.put( 'S', 1 );
		this.scoreMap.put( 'T', 1 );
		
		this.scoreMap.put( 'D', 2 );
		this.scoreMap.put( 'G', 2 );
		
		this.scoreMap.put( 'B', 3 );
		this.scoreMap.put( 'C', 3 );
		this.scoreMap.put( 'M', 3 );
		this.scoreMap.put( 'P', 3 );
		
		this.scoreMap.put( 'F', 4 );
		this.scoreMap.put( 'H', 4 );
		this.scoreMap.put( 'V', 4 );
		this.scoreMap.put( 'W', 4 );
		this.scoreMap.put( 'Y', 4 );
		
		this.scoreMap.put( 'K', 5 );
		
		this.scoreMap.put( 'J', 8 );
		this.scoreMap.put( 'X', 8 );
		
		this.scoreMap.put( 'Q', 10 );
		this.scoreMap.put( 'Z', 10 );
	}
	
	/**
	 * Get rid of anything that isn't a letter.
	 * Just get the first word.
	 * Handle nulls and empty strings.
	 * @param rawInput
	 * @return
	 */
	private String sanitize( String rawInput ) {
		if (rawInput == null ) {
			return null;
		} else if ( rawInput.isEmpty( ) ) {
			return "";
		}
		
		String[] tokens = rawInput.split( "\\s+" );
		if ( tokens.length == 0 ) {
			return "";
		}
		
		rawInput = tokens[0];
		
		StringBuilder sb = new StringBuilder();
		
		for ( int i = 0 ; i < rawInput.length( ) ; i++ ) {
			if ( Character.isLetter( rawInput.charAt( i ) ) ) {
				sb.append( rawInput.charAt( i ) );
			}
		}
		
		return sb.toString( );
	}
}
