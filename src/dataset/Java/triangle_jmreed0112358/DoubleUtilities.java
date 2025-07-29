package utilities;

import java.security.InvalidParameterException;

public class DoubleUtilities
{	
	/**
	 * Returns true if the input is greater than the target.
	 * @param input The value to test.
	 * @param target The value to compare against.
	 * @param tolerance
	 * @return
	 */
	public static boolean isGreaterThan(Double input, Double target, Double tolerance ) {
		if ( input == null || target == null || tolerance == null ) {
			throw new NullPointerException();
		}
		
		if ( input.isNaN( ) || input.isInfinite( ) || 
				target.isNaN( ) || target.isInfinite( ) ||
				tolerance.isNaN( ) || tolerance.isInfinite( ) ) {
			throw new InvalidParameterException();
		}
		
		tolerance = Math.abs( tolerance );
		return (input > (target + tolerance) );
	}
	
	/**
	 * Returns true if the input is less than the target.
	 * @param input The value to test.
	 * @param target The value to compare against.
	 * @param tolerance
	 * @return
	 */
	public static boolean isLessThan(Double input, Double target, Double tolerance ) {
		if ( input == null || target == null || tolerance == null ) {
			throw new NullPointerException();
		}
		
		if ( input.isNaN( ) || input.isInfinite( ) || 
				target.isNaN( ) || target.isInfinite( ) ||
				tolerance.isNaN( ) || tolerance.isInfinite( ) ) {
			throw new InvalidParameterException();
		}
		
		tolerance = Math.abs( tolerance );
		return (input < (target - tolerance) );
	}
	
	/**
	 * Tells us if the double is near or equal to the target.
	 * @param input The value to test.
	 * @param target The value to compare against.
	 * @param tolerance How close to the target we can get.  (Should be positive)
	 * @return
	 */
	public static boolean isNear(Double input, Double target, Double tolerance) {
		if ( input == null || target == null || tolerance == null ) {
			throw new NullPointerException();
		}
		
		if ( input.isNaN( ) || input.isInfinite( ) || 
				target.isNaN( ) || target.isInfinite( ) ||
				tolerance.isNaN( ) || tolerance.isInfinite( ) ) {
			throw new InvalidParameterException();
		}
		
		tolerance = Math.abs( tolerance );
		return ( input <= (target + tolerance) && input >= (target - tolerance) );
	}
	
	/**
	 * Specialized version of isNear, where target is zero.
	 * @param input The value to test.
	 * @param tolerance How close to the target (0.0) we can get.  (Should be positive)
	 * @return
	 */
	public static boolean isZero(Double input, Double tolerance) {
		if ( input == null || tolerance == null ) {
			throw new NullPointerException();
		}
		
		if ( input.isNaN( ) || input.isInfinite( ) || 
				tolerance.isNaN( ) || tolerance.isInfinite( ) ) {
			throw new InvalidParameterException();
		}
		
		tolerance = Math.abs( tolerance );
		return ( input <= (0.0 + tolerance) && input >= (0.0 - tolerance) );
	}
}
