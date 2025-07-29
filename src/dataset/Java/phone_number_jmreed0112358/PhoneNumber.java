package phonenumber;

import exceptions.NotImplementedException;

public class PhoneNumber
{
	private Boolean invalid = false;
	private String countryCode = "0";
	private String areaCode = "000";
	private String exchangeCode = "000";
	private String numberCode = "0000";
	
	private final String ERROR_RESPONSE = "0000000000";
	
	public PhoneNumber( String rawInput)
	{
		rawInput = this.sanitize( rawInput );
		this.parse( rawInput );
	}
	
	public String getAreaCode() {
		if ( this.invalid ) {
			return "000";
		}
		return this.areaCode;
	}
	
	public String getExchangeCode() {
		if ( this.invalid ) {
			return "000";
		}
		return this.exchangeCode;
	}
	
	public String getNumber() {
		if ( this.invalid ) {
			return ERROR_RESPONSE;
		}
		
		StringBuilder sb = new StringBuilder();

		sb.append( areaCode );
		sb.append( exchangeCode );
		sb.append( numberCode );
		
		return sb.toString( );
	}
	
	public String getNumberCode() {
		if ( this.invalid ) {
			return "0000";
		}
		return this.numberCode;
	}
	
	private void parse(String rawInput) {
		if ( rawInput.length( ) == 11 || rawInput.length( ) == 10 ) {
			if ( rawInput.length( ) == 11 )
			{
				this.parseCountryCode( rawInput );
			}
			
			this.areaCode = this.parsePhoneNumberPart( rawInput, 0, 3 );
			this.exchangeCode = this.parsePhoneNumberPart( rawInput, 3, 3 );
			this.numberCode = this.parsePhoneNumberPart( rawInput, 6, 4 );
		} else {
			this.invalid = true;
		}
	}
	
	private String parsePhoneNumberPart( String rawInput, int startIndex, int length ) {
		int loopStart = startIndex;
		if ( rawInput.length() == 11 ) {
			loopStart += 1;
		}
		
		return rawInput.substring( loopStart, loopStart + length );
	}
	
	private void parseCountryCode( String rawInput ) {
		if ( rawInput.length( ) == 11 && rawInput.charAt( 0 ) == '1' ) {
			this.countryCode = "1";
		} else {
			this.invalid = true;
		}
	}
	
	public String pretty() {
		if ( this.invalid ) {
			return ERROR_RESPONSE;
		}
		
		StringBuffer sb = new StringBuffer();
		
		sb.append( "(" );
		sb.append( this.areaCode );
		sb.append( ") " );
		sb.append( this.exchangeCode );
		sb.append( "-" );
		sb.append( this.numberCode );
		
		return sb.toString( );
	}
	
	/*
	 * Removes everything except digits.
	 */
	private String sanitize(String rawInput) {
		StringBuilder sb = new StringBuilder();
		
		for ( int i = 0 ; i < rawInput.length( ) ; i++ ) {
			if ( Character.isDigit( rawInput.charAt( i ) ) ) {
				sb.append( rawInput.charAt( i ) );
			}
		}
		
		return sb.toString( );
	}
}
