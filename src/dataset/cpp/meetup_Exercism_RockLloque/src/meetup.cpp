/*
 * =====================================================================================
 *
 *       Filename:  meetup.cpp
 *
 *    Description:  
 *
 *        Version:  1.0
 *        Created:  12.01.2016 15:12:10
 *       Revision:  none
 *       Compiler:  gcc
 *
 *
 * =====================================================================================
 */

#include "meetup.h"


namespace meetup
{
	boost::gregorian::date scheduler::teenth_day(boost::date_time::weekdays const& d) const 
	{
		return boost::gregorian::first_day_of_the_week_after(d).get_date({year_,month_,12});
	}


	boost::gregorian::date scheduler::monteenth() const 
	{
		return teenth_day(boost::date_time::weekdays::Monday);
	}

	boost::gregorian::date scheduler::tuesteenth() const 
	{
		return teenth_day(boost::date_time::weekdays::Tuesday);
	}
	boost::gregorian::date scheduler::wednesteenth() const 
	{
		return teenth_day(boost::date_time::weekdays::Wednesday);
	}

	boost::gregorian::date scheduler::thursteenth() const 
	{
		return teenth_day(boost::date_time::weekdays::Thursday);
	}

	boost::gregorian::date scheduler::friteenth() const 
	{
		return teenth_day(boost::date_time::weekdays::Friday);
	}

	boost::gregorian::date scheduler::saturteenth() const 
	{
		return teenth_day(boost::date_time::weekdays::Saturday);
	}

	boost::gregorian::date scheduler::sunteenth() const 
	{
		return teenth_day(boost::date_time::weekdays::Sunday);
	}

	/*
	 * Functions for returning the first Weekday of a month
	 */
	boost::gregorian::date scheduler::first_day(boost::date_time::weekdays const& d )const
	{
		return boost::gregorian::nth_day_of_the_week_in_month(boost::gregorian::nth_day_of_the_week_in_month::first ,d, month_).get_date(year_);
	}

	boost::gregorian::date scheduler::first_monday() const
	{
		return first_day(boost::date_time::weekdays::Monday);
	}

	boost::gregorian::date scheduler::first_tuesday() const
	{
		return first_day(boost::date_time::weekdays::Tuesday);
	}

	boost::gregorian::date scheduler::first_wednesday() const
	{
		return first_day(boost::date_time::weekdays::Wednesday);
	}

	boost::gregorian::date scheduler::first_thursday() const
	{
		return first_day(boost::date_time::weekdays::Thursday);
	}

	boost::gregorian::date scheduler::first_friday() const
	{
		return first_day(boost::date_time::weekdays::Friday);
	}

	boost::gregorian::date scheduler::first_saturday() const
	{
		return first_day(boost::date_time::weekdays::Saturday);
	}

	boost::gregorian::date scheduler::first_sunday() const
	{
		return first_day(boost::date_time::weekdays::Sunday);
	}

	boost::gregorian::date scheduler::second_monday() const
	{
		return first_day(boost::date_time::weekdays::Monday) + boost::gregorian::days(7);
	}

	boost::gregorian::date scheduler::second_tuesday() const
	{
		return first_day(boost::date_time::weekdays::Tuesday)+ boost::gregorian::days(7);
	}

	boost::gregorian::date scheduler::second_wednesday() const
	{
		return first_day(boost::date_time::weekdays::Wednesday)+ boost::gregorian::days(7);
	}

	boost::gregorian::date scheduler::second_thursday() const
	{
		return first_day(boost::date_time::weekdays::Thursday)+ boost::gregorian::days(7);
	}

	boost::gregorian::date scheduler::second_friday() const
	{
		return first_day(boost::date_time::weekdays::Friday)+ boost::gregorian::days(7);
	}

	boost::gregorian::date scheduler::second_saturday() const
	{
		return first_day(boost::date_time::weekdays::Saturday)+ boost::gregorian::days(7);
	}

	boost::gregorian::date scheduler::second_sunday() const
	{
		return first_day(boost::date_time::weekdays::Sunday)+ boost::gregorian::days(7);
	}


	boost::gregorian::date scheduler::third_monday() const
	{
		return first_day(boost::date_time::weekdays::Monday) + boost::gregorian::days(14);
	}

	boost::gregorian::date scheduler::third_tuesday() const
	{
		return first_day(boost::date_time::weekdays::Tuesday)+ boost::gregorian::days(14);
	}

	boost::gregorian::date scheduler::third_wednesday() const
	{
		return first_day(boost::date_time::weekdays::Wednesday)+ boost::gregorian::days(14);
	}

	boost::gregorian::date scheduler::third_thursday() const
	{
		return first_day(boost::date_time::weekdays::Thursday)+ boost::gregorian::days(14);
	}

	boost::gregorian::date scheduler::third_friday() const
	{
		return first_day(boost::date_time::weekdays::Friday)+ boost::gregorian::days(14);
	}

	boost::gregorian::date scheduler::third_saturday() const
	{
		return first_day(boost::date_time::weekdays::Saturday)+ boost::gregorian::days(14);
	}

	boost::gregorian::date scheduler::third_sunday() const
	{
		return first_day(boost::date_time::weekdays::Sunday)+ boost::gregorian::days(14);
	}


	boost::gregorian::date scheduler::fourth_monday() const
	{
		return first_day(boost::date_time::weekdays::Monday) + boost::gregorian::days(21);
	}

	boost::gregorian::date scheduler::fourth_tuesday() const
	{
		return first_day(boost::date_time::weekdays::Tuesday)+ boost::gregorian::days(21);
	}

	boost::gregorian::date scheduler::fourth_wednesday() const
	{
		return first_day(boost::date_time::weekdays::Wednesday)+ boost::gregorian::days(21);
	}

	boost::gregorian::date scheduler::fourth_thursday() const
	{
		return first_day(boost::date_time::weekdays::Thursday)+ boost::gregorian::days(21);
	}

	boost::gregorian::date scheduler::fourth_friday() const
	{
		return first_day(boost::date_time::weekdays::Friday)+ boost::gregorian::days(21);
	}

	boost::gregorian::date scheduler::fourth_saturday() const
	{
		return first_day(boost::date_time::weekdays::Saturday)+ boost::gregorian::days(21);
	}

	boost::gregorian::date scheduler::fourth_sunday() const
	{
		return first_day(boost::date_time::weekdays::Sunday)+ boost::gregorian::days(21);
	}

	//Functions to determin the last day of month
	boost::gregorian::date scheduler::last_day(boost::date_time::weekdays const& d)const
	{
		return boost::gregorian::last_day_of_the_week_in_month(d, month_).get_date(year_);
	}

	boost::gregorian::date scheduler::last_monday() const
	{
		return last_day(boost::date_time::weekdays::Monday) ;
	}

	boost::gregorian::date scheduler::last_tuesday() const
	{
		return last_day(boost::date_time::weekdays::Tuesday);
	}

	boost::gregorian::date scheduler::last_wednesday() const
	{
		return last_day(boost::date_time::weekdays::Wednesday);
	}

	boost::gregorian::date scheduler::last_thursday() const
	{
		return last_day(boost::date_time::weekdays::Thursday);
	}

	boost::gregorian::date scheduler::last_friday() const
	{
		return last_day(boost::date_time::weekdays::Friday);
	}

	boost::gregorian::date scheduler::last_saturday() const
	{
		return last_day(boost::date_time::weekdays::Saturday);
	}

	boost::gregorian::date scheduler::last_sunday() const
	{
		return last_day(boost::date_time::weekdays::Sunday);
	}

}
