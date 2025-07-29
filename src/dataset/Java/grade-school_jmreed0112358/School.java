package gradeschool;

import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import exceptions.NotImplementedException;

public class School
{
	private Map<Integer, List<String>> roster;
	
	public School( )
	{
		this.roster = new HashMap<Integer, List<String>>();
	}

	/**
	 * Add a new student to the roster.
	 * @param name A non-empty, non-null String representing the student's name.
	 * @param grade The student's grade, an Integer in the range 1-12 inclusive.
	 */
	public void add(String name, Integer grade) {
		if ( name == null ) {
			throw new NullPointerException();
		} else if ( name.isEmpty( ) || !(grade >= 1 && grade <= 12) ) {
			throw new InvalidParameterException();
		}
		
		List<String> listOfStudents = this.roster.get( grade );
		if ( listOfStudents == null ) {
			listOfStudents = new ArrayList<String>();
			listOfStudents.add( name );
			this.roster.put( grade, listOfStudents );
		} else {
			listOfStudents.add( name );
			this.roster.replace( grade, listOfStudents );
		}
	}
	
	/**
	 * Returns the roster.
	 * @return
	 */
	public Map<Integer, List<String>> db() {
		return this.roster;
	}
	
	/**
	 * Given a grade, returns a list of students in that grade, or an empty list if there are no students in that grade.
	 * @param grade
	 * @return
	 */
	public List<String> grade(Integer grade) {
		if ( !(grade >= 1 && grade <= 12) ) {
			throw new InvalidParameterException();
		}
		
		List<String> listOfStudents = this.roster.get( grade );
		if ( listOfStudents == null ) {
			return new ArrayList<String>();
		} else {
			return listOfStudents;
		}
	}
	
	/**
	 * Sorts the roster, and returns it.
	 * @return
	 */
	public Map<Integer, List<String>> sort() {
		for ( int i = 1 ; i <= 12 ; i++ ) {
			List<String> listOfStudents = this.roster.get( i );
			if ( listOfStudents != null ) {
				Collections.sort( listOfStudents );
				this.roster.replace( i, listOfStudents );
			}
		}
		
		return this.roster;
	}
}
