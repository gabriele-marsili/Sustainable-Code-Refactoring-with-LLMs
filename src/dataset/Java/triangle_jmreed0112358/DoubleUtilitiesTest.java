package utilities;

import static org.junit.Assert.*;

import java.security.InvalidParameterException;

import org.junit.Test;

public class DoubleUtilitiesTest
{
	// isGreaterThan tests.
	@Test
	public void test_isGreaterThan_InvalidInputs_NullInputs_ThrowsException() {
		try {
			DoubleUtilities.isGreaterThan( null, null, null );
			fail("Supposed to catch NullPointerException");
		} catch ( NullPointerException npe ) {
			
		} catch ( Exception e ) {
			fail("Expected to catch NullPointerException");
		}
	}

	@Test
	public void test_isGreaterThan_InvalidInputs_NaNInputs_ThrowsException() {
		try {
			DoubleUtilities.isGreaterThan( Double.NaN, Double.NaN, Double.NaN );
			fail("Supposed to catch InvalidParameterException");
		} catch ( InvalidParameterException npe ) {
			
		} catch ( Exception e ) {
			fail("Expected to catch InvalidParameterException");
		}
	}
	
	@Test
	public void test_isGreaterThan_InvalidInputs_InfiniteInputs_ThrowsException() {
		try {
			DoubleUtilities.isGreaterThan( Double.POSITIVE_INFINITY, Double.NEGATIVE_INFINITY, Double.POSITIVE_INFINITY );
			fail("Supposed to catch InvalidParameterException");
		} catch ( InvalidParameterException npe ) {
			
		} catch ( Exception e ) {
			fail("Expected to catch InvalidParameterException");
		}
	}
	
	@Test
	public void test_isGreaterThan_InvalidInputs_HandlesNegativeTolerance_ExpectedResult() {
		assertTrue( DoubleUtilities.isGreaterThan( 6.0, 3.0, -0.1 ) );
	}
	
	@Test
	public void test_isGreaterThan_ValidInputs_LessThanTarget_ExpectedResult() {
		assertFalse( DoubleUtilities.isGreaterThan( 2.0, 3.0, 0.1 ) );
	}
	
	@Test
	public void test_isGreaterThan_ValidInputs_GreaterThanTarget_ExpectedResult() {
		assertTrue( DoubleUtilities.isGreaterThan( 6.0, 3.0, 0.1 ) );
	}
	
	@Test
	public void test_isGreaterThan_ValidInputs_GreaterThanTargetAndClose_ExpectedResult() {
		assertFalse( DoubleUtilities.isGreaterThan( 3.05, 3.0, 0.1 ) );
	}
	
	@Test
	public void test_isGreaterThan_ValidInputs_LessThanTargetButWithinTolerance_ExpectedResult() {
		assertFalse( DoubleUtilities.isGreaterThan( 2.95, 3.0, 0.1 ) );
	}
	
	@Test
	public void test_isGreaterThan_ValidInputs_IsTarget_ExpectedResult() {
		assertFalse( DoubleUtilities.isGreaterThan( 3.0, 3.0, 0.1 ) );
	}
	
	// isLessThan tests.
	@Test
	public void test_isLessThan_InvalidInputs_NullInputs_ThrowsException() {
		try {
			DoubleUtilities.isLessThan( null, null, null );
			fail("Supposed to catch NullPointerException");
		} catch ( NullPointerException npe ) {
			
		} catch ( Exception e ) {
			fail("Expected to catch NullPointerException");
		}
	}

	@Test
	public void test_isLessThan_InvalidInputs_NaNInputs_ThrowsException() {
		try {
			DoubleUtilities.isLessThan( Double.NaN, Double.NaN, Double.NaN );
			fail("Supposed to catch InvalidParameterException");
		} catch ( InvalidParameterException npe ) {
			
		} catch ( Exception e ) {
			fail("Expected to catch InvalidParameterException");
		}
	}
	
	@Test
	public void test_isLessThan_InvalidInputs_InfiniteInputs_ThrowsException() {
		try {
			DoubleUtilities.isLessThan( Double.POSITIVE_INFINITY, Double.NEGATIVE_INFINITY, Double.POSITIVE_INFINITY );
			fail("Supposed to catch InvalidParameterException");
		} catch ( InvalidParameterException npe ) {
			
		} catch ( Exception e ) {
			fail("Expected to catch InvalidParameterException");
		}
	}
	
	@Test
	public void test_isLessThan_InvalidInputs_HandlesNegativeTolerance_ExpectedResult() {
		assertTrue( DoubleUtilities.isLessThan( 2.0, 3.0, -0.1 ) );
	}
	
	@Test
	public void test_isLessThan_ValidInputs_GreaterThanTarget_ExpectedResult() {
		assertFalse( DoubleUtilities.isLessThan( 6.0, 3.0, 0.1 ) );
	}
	
	@Test
	public void test_isLessThan_ValidInputs_LessThanTarget_ExpectedResult() {
		assertTrue( DoubleUtilities.isLessThan( 1.0, 3.0, 0.1 ) );
	}
	
	@Test
	public void test_isLessThan_ValidInputs_LessThanTargetAndClose_ExpectedResult() {
		assertFalse( DoubleUtilities.isLessThan( 2.95, 3.0, 0.1 ) );
	}
	
	@Test
	public void test_isLessThan_ValidInputs_GreaterThanTargetButWithinTolerance_ExpectedResult() {
		assertFalse( DoubleUtilities.isLessThan( 3.05, 3.0, 0.1 ) );
	}
	
	@Test
	public void test_isLessThan_ValidInputs_IsTarget_ExpectedResult() {
		assertFalse( DoubleUtilities.isLessThan( 3.0, 3.0, 0.1 ) );
	}
	
	// isNear tests.
	@Test
	public void test_isNear_InvalidInputs_NullInputs_ThrowsException() {
		try {
			DoubleUtilities.isNear( null, null, null );
			fail("Supposed to catch NullPointerException");
		} catch ( NullPointerException npe ) {
			
		} catch ( Exception e ) {
			fail("Expected to catch NullPointerException");
		}
	}

	@Test
	public void test_isNear_InvalidInputs_NaNInputs_ThrowsException() {
		try {
			DoubleUtilities.isNear( Double.NaN, Double.NaN, Double.NaN );
			fail("Supposed to catch InvalidParameterException");
		} catch ( InvalidParameterException npe ) {
			
		} catch ( Exception e ) {
			fail("Expected to catch InvalidParameterException");
		}
	}
	
	@Test
	public void test_isNear_InvalidInputs_InfiniteInputs_ThrowsException() {
		try {
			DoubleUtilities.isNear( Double.POSITIVE_INFINITY, Double.NEGATIVE_INFINITY, Double.POSITIVE_INFINITY );
			fail("Supposed to catch InvalidParameterException");
		} catch ( InvalidParameterException npe ) {
			
		} catch ( Exception e ) {
			fail("Expected to catch InvalidParameterException");
		}
	}
	
	@Test
	public void test_isNear_InvalidInputs_HandlesNegativeTolerance_ExpectedResult() {
		assertTrue( DoubleUtilities.isNear( 3.05, 3.0, -0.1 ) );
	}
	
	@Test
	public void test_isNear_ValidInputs_NotCloseToTarget_ExpectedResult() {
		assertFalse( DoubleUtilities.isNear( 6.0, 3.0, 0.1 ) );
	}
	
	@Test
	public void test_isNear_ValidInputs_CloseToTarget_ExpectedResult() {
		assertTrue( DoubleUtilities.isNear( 3.05, 3.0, 0.1 ) );
	}
	
	@Test
	public void test_isNear_ValidInputs_IsTarget_ExpectedResult() {
		assertTrue( DoubleUtilities.isNear( 3.0, 3.0, 0.1 ) );
	}
	
	// isZero tests.
	@Test
	public void test_isZero_InvalidInputs_NullInputs_ThrowsException() {
		try {
			DoubleUtilities.isNear( null, null, null );
			fail("Supposed to catch NullPointerException");
		} catch ( NullPointerException npe ) {
			
		} catch ( Exception e ) {
			fail("Expected to catch NullPointerException");
		}
	}

	@Test
	public void test_isZero_InvalidInputs_NaNInputs_ThrowsException() {
		try {
			DoubleUtilities.isZero( Double.NaN, Double.NaN );
			fail("Supposed to catch InvalidParameterException");
		} catch ( InvalidParameterException npe ) {
			
		} catch ( Exception e ) {
			fail("Expected to catch InvalidParameterException");
		}
	}
	
	@Test
	public void test_isZero_InvalidInputs_InfiniteInputs_ThrowsException() {
		try {
			DoubleUtilities.isZero( Double.POSITIVE_INFINITY, Double.POSITIVE_INFINITY );
			fail("Supposed to catch InvalidParameterException");
		} catch ( InvalidParameterException npe ) {
			
		} catch ( Exception e ) {
			fail("Expected to catch InvalidParameterException");
		}
	}
	
	@Test
	public void test_isZero_InvalidInputs_HandlesNegativeTolerance_ExpectedResult() {
		assertTrue( DoubleUtilities.isZero( 0.05, -0.1 ) );
	}
	
	@Test
	public void test_isZero_ValidInputs_NotCloseToZero_ExpectedResult() {
		assertFalse( DoubleUtilities.isZero( 4.0, 0.1 ) );
	}
	
	@Test
	public void test_isZero_ValidInputs_CloseToZero_ExpectedResult() {
		assertTrue( DoubleUtilities.isZero( 0.05, 0.1 ) );
	}
	
	@Test
	public void test_isZero_ValidInputs_IsZero_ExpectedResult() {
		assertTrue( DoubleUtilities.isZero( 0.0, 0.1 ) );
	}
}
