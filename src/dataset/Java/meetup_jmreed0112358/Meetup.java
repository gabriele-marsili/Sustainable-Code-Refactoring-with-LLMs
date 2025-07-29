package meetup;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.joda.time.DateTime;

import exceptions.NotImplementedException;
import utilities.JodaTimeUtilities;

public class Meetup
{
	// Days of the month, sorted by the day of the week.
	private Map<Integer, List<DateTime>> days;
	
	public Meetup(Integer month, Integer year )
	{
		this.initializeMap( month, year );
	}

	public DateTime day( int dayOfWeek, MeetupSchedule type ) {
		switch ( type )  {
			case FIRST:
				return this.days.get( dayOfWeek ).get( 0 );
			case SECOND:
				return this.days.get( dayOfWeek ).get( 1 );
			case THIRD:
				return this.days.get( dayOfWeek ).get( 2 );
			case FOURTH:
				return this.days.get( dayOfWeek ).get( 3 );
			case LAST:
				return this.getLast( dayOfWeek );
			case TEENTH:
				return this.getTeenth( dayOfWeek );
			default:
				return null;
		}
	}
	
	private DateTime getLast( int dayOfWeek ) {
		List<DateTime> value = this.days.get( dayOfWeek );
		return value.get( value.size( ) - 1 );
	}
	
	private DateTime getTeenth( int dayOfWeek ) {
		List<DateTime> value = this.days.get( dayOfWeek );
		for ( int i = 0 ; i < value.size( ) ; i++ ) {
			if ( JodaTimeUtilities.isTeenth( value.get( i ).getDayOfMonth( ) ) ) {
				return value.get( i );
			}
		}
		return null;
	}
	
	private void initializeMap(Integer month, Integer year) {
		// initialize the map.
		this.days = new HashMap<Integer, List<DateTime>>();
		for ( int i = 1 ; i <= 7 ; i++ ) {
			this.days.put( i, new ArrayList<DateTime>() );
		}

		int daysInTheMonth = JodaTimeUtilities.daysOfMonth( year, month );
		
		for ( int i = 1 ; i <= daysInTheMonth ; i++ ) {
			DateTime dt = new DateTime(year, month, i, 0, 0);
			Integer dayOfTheWeek = dt.getDayOfWeek( );
			List<DateTime> value = this.days.get( dayOfTheWeek );
			value.add( dt );
			this.days.replace( dayOfTheWeek, value );
		}
	}
}
