package spaceage;

import java.security.InvalidParameterException;

public class SpaceAge
{
	private Long ageInSeconds = 0L;
	
	public SpaceAge(Integer ageInSeconds) {
		if ( ageInSeconds < 0 ) {
			throw new InvalidParameterException();
		}
		
		this.ageInSeconds = ageInSeconds.longValue( );
	}
	
	public SpaceAge(Long ageInSeconds) {
		if ( ageInSeconds < 0 ) {
			throw new InvalidParameterException();
		}
		
		this.ageInSeconds = ageInSeconds;
	}
	
	public Double getSeconds() {
		return this.ageInSeconds.doubleValue( );
	}
	
	public Double onMercury() {
		return this.onEarth() / ConversionFactors.EARTH_YEARS_PER_MERCURY_YEAR;
	}
	
	public Double onVenus() {
		return this.onEarth() / ConversionFactors.EARTH_YEARS_PER_VENUS_YEAR;
	}
	
	public Double onEarth() {
		return this.getSeconds( ) / ConversionFactors.SECONDS_PER_EARTH_YEAR;
	}
	
	public Double onMars() {
		return this.onEarth() / ConversionFactors.EARTH_YEARS_PER_MARS_YEAR;
	}
	
	public Double onJupiter() {
		return this.onEarth() / ConversionFactors.EARTH_YEARS_PER_JUPITER_YEAR;
	}
	
	public Double onSaturn() {
		return this.onEarth() / ConversionFactors.EARTH_YEARS_PER_SATURN_YEAR;
	}
	
	public Double onUranus() {
		return this.onEarth() / ConversionFactors.EARTH_YEARS_PER_URANUS_YEAR;
	}
	
	public Double onNeptune() {
		return this.onEarth() / ConversionFactors.EARTH_YEARS_PER_NEPTUNE_YEAR;
	}
}
