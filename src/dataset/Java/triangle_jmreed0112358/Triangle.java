package triangle;

import utilities.DoubleUtilities;

public class Triangle
{	
	private final Double TOLERANCE = 0.0001;
	private Double side1 = 0.0;
	private Double side2 = 0.0;
	private Double side3 = 0.0;
	
	/**
	 * Integer objects should be non-null, and positive.
	 * @param v1
	 * @param v2
	 * @param v3
	 */
	public Triangle(Integer side1, Integer side2, Integer side3 ) throws TriangleException {
		if ( side1 == null || side2 == null || side3 == null ) {
			throw new NullPointerException();
		} else if ( side1 <= 0 || side2 <= 0 || side3 <= 0 ) {
			throw new TriangleException();
		}
		
		this.isValid( side1.doubleValue( ), side2.doubleValue( ), side3.doubleValue( ) );
		
		this.side1 = side1.doubleValue( );
		this.side2 = side2.doubleValue( );
		this.side3 = side3.doubleValue( );
	}
	
	/**
	 * Double objects should be non-null, and positive.
	 * @param v1
	 * @param v2
	 * @param v3
	 */
	public Triangle(Double side1, Double side2, Double side3 ) throws TriangleException {
		if ( side1 == null || side2 == null || side3 == null ) {
			throw new NullPointerException();
		} else if ( DoubleUtilities.isLessThan( side1, 0.0, TOLERANCE ) || 
				DoubleUtilities.isLessThan( side2, 0.0, TOLERANCE ) || 
				DoubleUtilities.isLessThan( side3, 0.0, TOLERANCE ) ) {
			throw new TriangleException();
		}
		
		this.isValid( side1, side2, side3 );
		
		this.side1 = side1;
		this.side2 = side2;
		this.side3 = side3;
	}
	
	/**
	 * Given sides, what kind of triangle is this?
	 * @return
	 */
	public TriangleKind getKind() {
		if ( DoubleUtilities.isNear( this.side1, this.side2, TOLERANCE ) &&
				DoubleUtilities.isNear( this.side1, this.side3, TOLERANCE ) ) {
			return TriangleKind.EQUILATERAL;
		} else if ( DoubleUtilities.isNear( this.side1, this.side2, TOLERANCE ) || DoubleUtilities.isNear( this.side1, this.side3, TOLERANCE ) || DoubleUtilities.isNear(  this.side2 , this.side3, TOLERANCE ) ) {
			return TriangleKind.ISOSCELES;
		} else {
			return TriangleKind.SCALENE;
		}
	}
	
	/**
	 * This is a valid triangle if it satisfies the triangle inequality for all sides.
	 * @param side1
	 * @param side2
	 * @param side3
	 * @return
	 * @throws TriangleException
	 */
	private boolean isValid(Double side1, Double side2, Double side3) throws TriangleException {
		if ( DoubleUtilities.isGreaterThan( side1, side2 + side3, TOLERANCE ) ||
				DoubleUtilities.isNear( side1, side2 + side3, TOLERANCE ) ||
				DoubleUtilities.isGreaterThan( side2, side1 + side3, TOLERANCE ) ||
				DoubleUtilities.isNear( side2, side1 + side3, TOLERANCE ) ||
				DoubleUtilities.isGreaterThan( side3, side1 + side2, TOLERANCE ) ||
				DoubleUtilities.isNear( side3, side1 + side2, TOLERANCE ) ||
				DoubleUtilities.isZero( side1, TOLERANCE ) ||
				DoubleUtilities.isZero( side2, TOLERANCE ) ||
				DoubleUtilities.isZero( side3, TOLERANCE ) ) {
			throw new TriangleException();
		}
		
		return true;
	}
}
