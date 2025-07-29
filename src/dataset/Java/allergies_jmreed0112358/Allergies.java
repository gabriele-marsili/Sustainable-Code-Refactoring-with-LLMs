package allergies;

import java.util.List;
import java.security.InvalidParameterException;
import java.util.ArrayList;

import allergies.enums.Allergen;

public class Allergies
{
	private int allergyCode;
	
	public Allergies( int allergyCode ) {
		if (allergyCode < 0 ) {
			throw new InvalidParameterException("Negative allergy codes do not make sense!");
		}
		this.allergyCode = allergyCode;
	}

	public boolean isAllergicTo( Allergen allergen ) {
		return (allergen.getScore() & this.allergyCode) != 0;
	}
	
	public List<Allergen> getList( ) {
		Allergen[] allergenArray = Allergen.values( );
		List<Allergen> result = new ArrayList<Allergen>();
		
		for ( int i = 0 ; i < allergenArray.length ; i++ ) {
			if ((allergenArray[i].getScore() & this.allergyCode) != 0) {
				result.add( allergenArray[i] );
			}
		}
		return result;
	}
}