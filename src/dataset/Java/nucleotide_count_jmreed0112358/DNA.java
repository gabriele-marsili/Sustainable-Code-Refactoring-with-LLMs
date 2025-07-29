package dna;

import java.util.HashMap;
import java.util.Map;

public class DNA {
	
	private Map<Character, Integer> nucleotideCounts;
	
	public DNA(String dnaString) {
		dnaString = this.sanitize( dnaString );
		this.initialize( );
		this.parseDnaString( dnaString );
	}
	
	public Integer count(Character nucleotide) throws IllegalArgumentException {
		if ( !this.isValidNucleotide( nucleotide ) ) {
			throw new IllegalArgumentException();
		}
		
		return this.nucleotideCounts.get( nucleotide );
	}

	public Map<Character, Integer> nucleotideCounts() {
		return this.nucleotideCounts;
	}
	
	private void initialize() {
		this.nucleotideCounts = new HashMap<Character, Integer>();
		this.nucleotideCounts.put( 'A', 0 );
		this.nucleotideCounts.put( 'C', 0 );
		this.nucleotideCounts.put( 'G', 0 );
		this.nucleotideCounts.put( 'T', 0 );
	}
	
	private boolean isValidNucleotide(Character input) {

		if ( input.equals( 'A' ) || input.equals( 'C' ) || input.equals( 'G' ) || input.equals( 'T' )) {
			return true;
		}
		
		return false;
	}
	
	private void parseDnaString(String input) {
	
		for ( int i = 0 ; i < input.length( ) ; i++ ) {
			if ( this.isValidNucleotide( input.charAt( i ) ) ) {
				Integer value = this.nucleotideCounts.get( input.charAt( i ) );
				value += 1;
				this.nucleotideCounts.replace( input.charAt( i ), value );
			}
		}
	}
	
	private String sanitize(String input) {

		input = input.toUpperCase( );
		
		StringBuilder sb = new StringBuilder();
		
		for ( int i = 0 ; i < input.length( ) ; i++ ) {
			if ( this.isValidNucleotide( input.charAt( i ) ) ) {
				sb.append( input.charAt( i ) );
			}
		}
		return sb.toString( );
	}
}
