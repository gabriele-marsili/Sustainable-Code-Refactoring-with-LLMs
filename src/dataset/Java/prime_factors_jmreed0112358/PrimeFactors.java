package primefactors;

import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.List;

public class PrimeFactors
{
	public static List<Long> getForNumber(Long input) {
		List<Long> result = new ArrayList<Long>();
		
		if ( input == null ) {
			throw new NullPointerException();
		} else if ( input < 0 ) {
			throw new InvalidParameterException();
		} else if ( input == 0 || input == 1L ) {
			return result;
		}
		
		for ( Long i = 2L ; i <= input ; i++ ) {
			while ( input % i == 0 ) {
				result.add( i );
				input = input / i;
			}
			
			if ( input == 1 ) {
				continue;
			}
		}
		
		return result;
	}
}
