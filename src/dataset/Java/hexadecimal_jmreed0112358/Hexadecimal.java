package hexadecimal;

import java.security.InvalidParameterException;

/**
 * This class handles positive hexadecimal numbers only.
 * @author jmreed
 *
 */
public class Hexadecimal
{
	private static final String INT_MAX_HEX = "7fffffff";
	
	/**
	 * Numbers must be less than INT_MAX.  Throws InvalidParameterException if the hexadecimal string would
	 * result in a number too large to represent as an integer.
	 * @param hex
	 * @return
	 * @throws NullPointerException
	 * @throws InvalidParameterException
	 */
	public static int toDecimal(String hex) throws NullPointerException, InvalidParameterException {
		
		if ( hex.isEmpty( ) ) {
			throw new InvalidParameterException("Input string cannot be empty");
		} 
		
		hex = hex.toLowerCase( );
		
		if ( !isValidHexadecimalString( hex ) ) {
			throw new InvalidParameterException("Input string was not a valid hexadecimal string");
		} else if ( isGreaterThan( hex, INT_MAX_HEX) ) {
			throw new InvalidParameterException("Result is larger than what an int can represent");
		}
		// reverse string.
		String hexReversed = new StringBuilder(hex).reverse( ).toString( );
		int result = 0;
		// for each char:
		for (int i = 0 ; i < hexReversed.length( ) ; i++ ) {
			result += hexDigitToInt(hexReversed.charAt( i ) ) * Math.pow( 16, i );
		}
			// result += hexDigitToInt(char) * pow(16, i)
		return result;
	}
	
	public static boolean isGreaterThan( String first, String second ) throws InvalidParameterException {
		
		if ( first.isEmpty( ) || second.isEmpty( ) ) {
			throw new InvalidParameterException("Input strings cannot be empty");
		} 

		first = first.toLowerCase( );
		second = second.toLowerCase( );
		
		if ( !isValidHexadecimalString( first ) || !isValidHexadecimalString( second )) {
			throw new InvalidParameterException("Input strings were not valid hexadecimal strings");
		} else if ( first.length( ) != second.length( ) ) {
			return ( first.length( ) > second.length( ) );
		} else if ( first.equals( second ) ) {
			return false;
		}
		
		for ( int i = 0 ; i < first.length( ) ; i++ ) {
			if (hexDigitToInt(first.charAt( i )) > hexDigitToInt(second.charAt( i ))) {
				return true;
			} else if (hexDigitToInt(first.charAt( i )) < hexDigitToInt(second.charAt( i ))) {
				return false;
			}
		}
		
		return false;
	}
	
	/**
	 * Checks the input string for validity.
	 * Abuse hexDigitToInt behavior to check each char in the string,
	 * return false if InvalidParameterException is thrown,
	 * return true if every char is valid.
	 * @param input
	 * @return
	 */
	public static boolean isValidHexadecimalString(String input) throws InvalidParameterException {
		
		if ( input.isEmpty( ) ) {
			return false;
		} else if (input.charAt( 0 ) == '-') {
			throw new InvalidParameterException("input cannot be negative");
		}
		
		try {
			for ( int i = 0 ; i < input.length( ) ; i++ ) {
				hexDigitToInt(input.charAt( i ));
			}
			return true;
		} catch ( InvalidParameterException ipe ) {
			return false;
		}
	}
	
	public static int hexDigitToInt(char hexDigit) throws InvalidParameterException {
		switch ( hexDigit ) {
			case '0':
				return 0;
			case '1':
				return 1;
			case '2':
				return 2;
			case '3':
				return 3;
			case '4':
				return 4;
			case '5':
				return 5;
			case '6':
				return 6;
			case '7':
				return 7;
			case '8':
				return 8;
			case '9':
				return 9;
			case 'a':
				return 10;
			case 'b':
				return 11;
			case 'c':
				return 12;
			case 'd':
				return 13;
			case 'e':
				return 14;
			case 'f':
				return 15;
			default:
				throw new InvalidParameterException();
		}
	}
}
