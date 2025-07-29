package etl;
import java.security.InvalidParameterException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Etl {
   public Map<String, Integer> transform(Map<Integer, List<String>> old) throws NullPointerException, InvalidParameterException {
	   if ( old == null ) {
		   throw new NullPointerException();
	   } else if ( old.isEmpty( ) ) {
		   throw new InvalidParameterException();
	   }
	   
	   if ( !this.isInputValid( old ) ) {
		   throw new InvalidParameterException();
	   }
	   
	   Map<String, Integer> result = new HashMap<String, Integer>();
	   
	   for (Map.Entry<Integer, List<String>> entry : old.entrySet( ) ) {
		   Integer key = entry.getKey( );
		   List<String> value = entry.getValue( );
		   System.out.println( "key: " + key + ", value: " + value );
		   for (String letter : value ) {
			   result.put( letter.toLowerCase( ), key );
		   }
	   }
	   
	   return result;
   }
   
   /**
    * Input is a Map with Integer keys, and List<String> values.
    * A valid input map contains: 
    * 1. positive Integer keys, 
    * 2, 3. non-null, non-empty List of Strings where 
    * 4, 5. each string is a single upper case character.
    * @param map
    * @return
    * @throws NullPointerException
    * @throws InvalidParameterException
    */
   private boolean isInputValid(Map<Integer, List<String>> map) throws NullPointerException, InvalidParameterException {
	   if ( map == null ) {
		   throw new NullPointerException();
	   } else if ( map.isEmpty( ) ) {
		   throw new InvalidParameterException();
	   }
	   
	   for (Map.Entry<Integer, List<String>> entry : map.entrySet( ) ) {
		   Integer key = entry.getKey( );
		   List<String> value = entry.getValue( );
		   
		   if ( key < 0 || value == null || value.isEmpty( ) ) {
			   return false;
		   }

		   for (String letterString : value ) {
			   if ( letterString.length( ) != 1 ) {
				   return false;
			   }
			   
			   if ( !Character.isUpperCase( letterString.charAt( 0 ) ) ) {
				   return false;
			   }
		   }
	   }
	   
	   return true;
   }
}
