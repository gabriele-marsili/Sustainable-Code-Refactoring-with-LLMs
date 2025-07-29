package primefactors;

import static org.junit.Assert.*;

import java.security.InvalidParameterException;

import org.junit.Test;

public class PrimeFactorsMoreTests
{
	@Test
	public void test_getForNumber_InvalidInput_NullLong_ThrowsException( ) {
		try {
			PrimeFactors.getForNumber( null );
			fail("Supposed to catch NullPointerException");
		} catch ( NullPointerException npe ) {
			
		} catch ( Exception e ) {
			fail("Expected to catch NullPointerException");
		}
	}
	
	@Test
	public void test_getForNumber_InvalidInput_NegativeLongs_ThrowsException( ) {
		try {
			PrimeFactors.getForNumber( -10L );
			fail("Supposed to catch InvalidParameterException");
		} catch ( InvalidParameterException ipe ) {
			
		} catch ( Exception e ) {
			fail("Expected to catch InvalidParameterException");
		}
	}
}
