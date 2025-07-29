package utilities;

import org.joda.time.DateTime;

public class JodaTimeUtilities
{
	public static int daysOfMonth(int year, int month) {
		DateTime dateTime = new DateTime(year, month, 1, 0, 0);
		return dateTime.dayOfMonth( ).getMaximumValue( );
	}
	
	public static boolean isTeenth( int n ) {
		return ( n >= 13 && n <= 19 );
	}
}
