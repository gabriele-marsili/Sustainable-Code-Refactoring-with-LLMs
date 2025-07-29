package utilities;

import static org.junit.Assert.*;

import org.joda.time.IllegalFieldValueException;
import org.junit.Test;

public class JodaTimeUtilitiesTest
{
	private final int[] teenths = { 13, 14, 15, 16, 17, 18, 19 };
	
	@Test
	public void test_daysOfMonth_InvalidInputs_ThrowsException( )
	{
		try {
			JodaTimeUtilities.daysOfMonth( -1, -1 );
			fail("Supposed to catch IllegalFieldValueException");
		} catch ( IllegalFieldValueException ifve ) {
			
		} catch ( Exception e ) {
			fail("Expected to catch IllegalFieldValueException");
		}
		
	}

	@Test
	public void test_daysOfMonth_ValidInputs_ExpectedResult() {
		assertEquals( 30, JodaTimeUtilities.daysOfMonth( 2016, 6 ) );
	}
	
	@Test
	public void test_isTeenth_ValidInput_ExpectedResult() {
		for ( int i = 0 ; i < teenths.length ; i++ ) {
			assertTrue( JodaTimeUtilities.isTeenth( teenths[i] ) );
		}
	}
}
