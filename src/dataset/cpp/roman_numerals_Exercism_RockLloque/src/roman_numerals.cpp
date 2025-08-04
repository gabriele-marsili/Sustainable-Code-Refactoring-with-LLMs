/*
 * =====================================================================================
 *
 *       Filename:  roman_numerals.cpp
 *
 *    Description:  
 *
 *        Version:  1.0
 *        Created:  16.08.2015 21:17:23
 *       Revision:  none
 *       Compiler:  gcc
 *
 *
 * =====================================================================================
 */

#include "roman_numerals.h"
#include <array>
#include <boost/tuple/tuple.hpp>
#include <iostream>


namespace roman
{
	typedef std::array< boost::tuple<int, char, int>,7> transMat;
	typedef std::array< boost::tuple<int, char, int>,7>::const_iterator transMatIt;
	typedef std::array< boost::tuple<int, char, int>,7>::const_reverse_iterator transMatRevIt;

	static const transMat transformMatrix {{
		{1,'I',3}, {5,'V',1}, {10,'X',3}, {50,'L',1}, {100,'C',3}, {500,'D',1}, {1000,'M',3} }};



	class numeralConversion
	{
		public:
			numeralConversion(unsigned a): arabic_{a}, revIt{transformMatrix.rbegin()}, revEnd{transformMatrix.rend()}, roman_{""}{convertToRoman();}


			std::string getRoman() const
			{
				return roman_;
			}
		private:


			void convertToRoman()
			{
				for( transMatRevIt it{revIt}; (it !=revEnd and arabic_ >0); ++it)
				{
					while( arabic_ >= it->get<0>())
					{
						roman_.push_back(it->get<1>());
						arabic_ -= it->get<0>();
					}

					checkForTurnedRomans(it);
				}
			}

			/* checkForTurnedRomans controlls whether the arabic numeral can be appended to roman_
			 * as a smaller roman numeral substraced from a higher roman numeral i.e.: IX
			 */
			void checkForTurnedRomans( transMatRevIt Revit)
			{
				int originalInt{Revit->get<0>()};
				char originalChar{Revit->get<1>()};
				++Revit;
				for(transMatIt it{transformMatrix.begin()} ; it != Revit.base(); ++it)
				{
					if( ((originalInt - it->get<0>()) <= arabic_) and arabic_ > 0 and it->get<2>()== 3)
					{
						roman_.push_back(it->get<1>());
						roman_.push_back(originalChar);
						arabic_ -= originalInt - it->get<0>();
						break;
					}
				}
			}

			/*
			 * arabic_ stores the value thats supposed to be transformed, respectively the 
			 * untransformed rest
			 */
			unsigned arabic_;

			/*
			 * roman_ stores the characters eventually given back the roman numeral
			 */
			std::string roman_;

			/*
			 * A reverse_iterator on the the reverse begin of the global transformmatrix transformMatrix.
			 * used because the program requires checks from highest to lowest value
			 */
			transMatRevIt revIt;

			/*
			 * A reverse_iterator on the the reverse end (one before the first value) of the global transformmatrix transMat.
			 * used to stop for-loop running the reverse_iterator revIt
			 */
			transMatRevIt revEnd;

			
	};

	std::string convert(unsigned a)
	{
		return numeralConversion(a).getRoman();
	}
}