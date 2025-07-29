package wordcount;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import exceptions.NotImplementedException;

public class WordCount {
	
	public List<String> parse(String input) {
		String[] tokens = input.split( "\\s+" );
		List<String> sanitizedStrings = new ArrayList<String>();
		for ( String token : tokens ) {
			String sanitizedString = this.sanitize( token );
			if ( !sanitizedString.isEmpty( ) ) {
				sanitizedStrings.add( sanitizedString );
			}
		}
		return sanitizedStrings;
	}
	
	public Map<String, Integer> phrase(String input) {
		Map<String, Integer> results = new HashMap<String, Integer>();
		List<String> sanitizedStrings = this.parse( input );
		
		for ( String sanitizedString : sanitizedStrings ) {
			Integer value = results.get( sanitizedString );
			if ( value == null ) {
				results.put( sanitizedString, 1 );
			} else {
				value +=1;
				results.replace( sanitizedString, value );
			}
		}
		return results;
	}
	
	private String sanitize(String input) {
		StringBuilder sb = new StringBuilder();
		for ( int i = 0 ; i < input.length( ) ; i++ ) {
			if (Character.isLetterOrDigit( input.charAt( i ) ) ) {
				sb.append( input.charAt( i ) );
			}
		}
		return sb.toString( ).toLowerCase( );
	}
}
