package atbashcipher;

import java.security.InvalidParameterException;

import exceptions.NotImplementedException;

public class Atbash
{
	private static final String alphabet = "abcdefghijklmnopqrstuvwxyz";
	private static final String reverseAlphabet = "zyxwvutsrqponmlkjihgfedcba";

	/**
	 * Decodes a string encoded by an atbash cippher.
	 * Remove all spaces from the input.
	 * There should be no spaces in the output.
	 * @param cipherText
	 * @return
	 */
	public static String decode(String cipherText) {
		if ( cipherText == null ) { 
			throw new NullPointerException();
		} else if ( cipherText.isEmpty() ) {
			return "";
		}
		
		cipherText = sanitize( cipherText );
		StringBuilder sb = new StringBuilder();
		
		for ( int i = 0 ; i < cipherText.length( ) ; i++ ) {
			sb.append( getDecodedLetter( cipherText.charAt( i ) ) );
		}
		
		return sb.toString( );
	}
	
	/**
	 * Encodes a string by atbash cipher.
	 * Spaces should be removed from the input.
	 * When building the output, the output should be groups of five letters, separated by a spaces.
	 * @param plainText
	 * @return
	 */
	public static String encode(String plainText) {
		if ( plainText == null ) { 
			throw new NullPointerException();
		} else if ( plainText.isEmpty() ) {
			return "";
		}
		
		plainText = sanitize( plainText );
		StringBuilder sb = new StringBuilder();
		
		for ( int i = 0 ; i < plainText.length( ) ; i++ ) {
			if ( i != 0 && i % 5 == 0 ) {
				sb.append( " " );
			}
			sb.append( getEncodedLetter( plainText.charAt( i ) ) );
		}
		
		return sb.toString( );
	}
	
	/**
	 * Given a encoded letter, get the correct decoded letter.
	 * @param letter
	 * @return
	 */
	private static Character getDecodedLetter(Character letter ) {
		if ( Character.isDigit( letter ) ) {
			return letter;
		}
		
		Integer index = 0;
		for ( index = 0 ; index < reverseAlphabet.length( ) ; index++ ) {
			if ( letter == reverseAlphabet.charAt( index ) ) {
				break;
			}
		}
		
		if ( index == reverseAlphabet.length( ) ) {
			throw new InvalidParameterException();
		} else {
			return alphabet.charAt( index );
		}
	}
	
	/**
	 * Given a letter, give the correct decoded letter;
	 * @param letter
	 * @return
	 */
	private static Character getEncodedLetter(Character letter) {
		if ( Character.isDigit( letter ) ) {
			return letter;
		}
		
		Integer index = 0;
		for ( index = 0 ; index < alphabet.length( ) ; index++ ) {
			if ( letter == alphabet.charAt( index ) ) {
				break;
			}
		}
		
		if ( index == alphabet.length( ) ) {
			throw new InvalidParameterException();
		} else {
			return reverseAlphabet.charAt( index );
		}
	}
	
	private static String sanitize(String input) {
		StringBuilder sb = new StringBuilder();
		
		for ( int i = 0 ; i < input.length( ) ; i++ ) {
			if ( Character.isLetterOrDigit( input.charAt( i ) ) ) {
				sb.append( input.charAt( i ) );
			}
		}
		
		return sb.toString( ).toLowerCase( );
	}
}
