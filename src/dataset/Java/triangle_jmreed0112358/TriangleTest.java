package triangle;
import org.junit.Test;

import triangle.TriangleException;
import triangle.TriangleKind;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.security.InvalidParameterException;

public class TriangleTest {

	@Test
	public void test_constructor_InvalidInputs_NegativeIntegerLengths_ThrowsException() {
		try {
			Integer side1 = -1;
			Integer side2 = -2;
			Integer side3 = -2;
			Triangle triangle = new Triangle(side1, side2, side3);
			fail("Supposed to catch TriangleException");
		} catch ( TriangleException te ) {
			
		} catch ( Exception e ) {
			fail("Expected to catch TriangleException");
		}
	}
	
	@Test
	public void test_constructor_InvalidInputs_NullIntegers_ThrowsException() {
		try {
			Integer side1 = null;
			Integer side2 = null;
			Integer side3 = null;
			Triangle triangle = new Triangle(side1, side2, side3);
			fail("Supposed to catch NullPointerException");
		} catch ( NullPointerException ipe ) {
			
		} catch ( Exception e ) {
			fail("Expected to catch NullPointerException");
		}
	}
	
	@Test
	public void test_constructor_InvalidInputs_NegativeDoubleLengths_ThrowsException() {
		try {
			Double side1 = -1.0;
			Double side2 = -2.0;
			Double side3 = -2.0;
			Triangle triangle = new Triangle(side1, side2, side3);
			fail("Supposed to catch TriangleException");
		} catch ( TriangleException te ) {
			
		} catch ( Exception e ) {
			fail("Expected to catch TriangleException");
		}
	}
	
	@Test
	public void test_constructor_InvalidInputs_NullDoubles_ThrowsException() {
		try {
			Integer side1 = null;
			Integer side2 = null;
			Integer side3 = null;
			Triangle triangle = new Triangle(side1, side2, side3);
			fail("Supposed to catch NullPointerException");
		} catch ( NullPointerException ipe ) {
			
		} catch ( Exception e ) {
			fail("Expected to catch NullPointerException");
		}
	}
	
    @Test
    public void equilateralTriangleHaveEqualSides() throws Exception {
        Triangle triangle = new Triangle(2, 2, 2);

        assertEquals(TriangleKind.EQUILATERAL, triangle.getKind());
    }

    @Test
    public void largerEquilateralTrianglesAlsoHaveEqualSides() throws Exception {
        Triangle triangle = new Triangle(10, 10, 10);

        assertEquals(TriangleKind.EQUILATERAL, triangle.getKind());
    }

    @Test
    public void isoscelesTrianglesHaveLastTwoSidesEqual() throws Exception {
        Triangle triangle = new Triangle(3, 4, 4);

        assertEquals(TriangleKind.ISOSCELES, triangle.getKind());
    }

    @Test
    public void isoscelesTrianglesHaveFirstAndLastSidesEqual() throws Exception {
        Triangle triangle = new Triangle(4, 3, 4);

        assertEquals(TriangleKind.ISOSCELES, triangle.getKind());
    }

    @Test
    public void isoscelesTrianglesHaveTwoFirstSidesEqual() throws Exception {
        Triangle triangle = new Triangle(4, 4, 3);

        assertEquals(TriangleKind.ISOSCELES, triangle.getKind());
    }

    @Test
    public void isoscelesTrianglesHaveInFactExactlyTwoSidesEqual() throws Exception {
        Triangle triangle = new Triangle(10, 10, 2);

        assertEquals(TriangleKind.ISOSCELES, triangle.getKind());
    }

    @Test
    public void scaleneTrianglesHaveNoEqualSides() throws Exception {
        Triangle triangle = new Triangle(3, 4, 5);

        assertEquals(TriangleKind.SCALENE, triangle.getKind());
    }

    @Test
    public void scaleneTrianglesHaveNoEqualSidesAtLargerScaleEither() throws Exception {
        Triangle triangle = new Triangle(10, 11, 12);

        assertEquals(TriangleKind.SCALENE, triangle.getKind());
    }

    @Test
    public void scaleneTrianglesHaveNoEqualSidesInDescendingOrderEither() throws Exception {
        Triangle triangle = new Triangle(5, 4, 2);

        assertEquals(TriangleKind.SCALENE, triangle.getKind());
    }

    @Test
    public void verySmallTrianglesAreLegal() throws Exception {
        Triangle triangle = new Triangle(0.4, 0.6, 0.3);

        assertEquals(TriangleKind.SCALENE, triangle.getKind());
    }

    @Test(expected = TriangleException.class)
    public void trianglesWithNoSizeAreIllegal() throws Exception {
        new Triangle(0, 0, 0);
    }

    @Test(expected = TriangleException.class)
    public void trianglesWithNegativeSidesAreIllegal() throws Exception {
        new Triangle(3, 4, -5);
    }

    @Test(expected = TriangleException.class)
    public void trianglesViolatingTriangleInequalityAreIllegal() throws Exception {
        new Triangle(1, 1, 3);
    }

    @Test(expected = TriangleException.class)
    public void trianglesViolatingTriangleInequalityAreIllegal2() throws Exception {
        new Triangle(2, 4, 2);
    }

    @Test(expected = TriangleException.class)
    public void trianglesViolatingTriangleInequalityAreIllegal3() throws Exception {
        new Triangle(7, 3, 2);
    }
}
