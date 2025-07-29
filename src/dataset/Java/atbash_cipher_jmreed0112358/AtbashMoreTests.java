package atbashcipher;

import static org.junit.Assert.*;

import org.junit.Test;

public class AtbashMoreTests
{
	@Test
	public void test_decode_InvalidInputs_NullString_ThrowsException( ) {
		try {
			Atbash.decode( null );
			fail("Supposed to catch NullPointerException");
		} catch ( NullPointerException npe ) {
			
		} catch ( Exception e ) {
			fail("Expected to catch NullPointerException");
		}
	}
	
	@Test
	public void test_encode_InvalidInput_NullString_ThrowsException( ) {
		try {
			Atbash.encode( null );
			fail("Supposed to catch NullPointerException");
		} catch ( NullPointerException npe ) {
			
		} catch ( Exception e ) {
			fail("Expected to catch NullPointerException");
		}
	}
}
