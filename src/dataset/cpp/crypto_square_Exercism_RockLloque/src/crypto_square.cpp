/*
 * =====================================================================================
 *
 *       Filename:  crypto_square.cpp
 *
 *    Description:  
 *
 *        Version:  1.0
 *        Created:  01.11.2015 21:12:06
 *       Revision:  none
 *       Compiler:  gcc
 *
 *
 * =====================================================================================
 */

#include "crypto_square.h"
#include <algorithm>
#include <cctype>
#include <cmath>



namespace crypto_square
{
	cipher::cipher( std::string const& input) : text_{input}, size_{0} 
	{
		normalize();
		size_ =  static_cast<unsigned>( ceil(std::sqrt(text_.length())));
	}

	void cipher::normalize()
	{
		text_.erase(std::remove_if( text_.begin(), text_.end(), [] (char c){ return not( isalnum(c));}),text_.end());
		std::transform( text_.begin(), text_.end(), text_.begin(), [](char c){return std::tolower(c);});
	}


	std::string cipher::normalize_plain_text()
	{
		
		return text_;
	}

	unsigned cipher::size() const
	{
		return size_;
	}



	std::vector<std::string> cipher::plain_text_segments() const
	{
		std::vector<std::string> segments( ceil(static_cast<double>(text_.length()) / size_));
		unsigned j{0};
		for(size_t i{0}; i < segments.size(); ++i)
		{
			segments.at(i) = text_.substr(j, size_);
			j += size_;
		}

		return segments;
	}

	std::string cipher::cipher_text() const
	{
		std::vector<std::string> segments{plain_text_segments()};
		std::string ciphered_text{};
		for(unsigned i{0}; i < size_; ++ i)
		{
			for(unsigned j{0}; j< segments.size(); ++j)
			{
				if(i < segments.at(j).size())
				{
					ciphered_text.push_back(segments.at(j).at(i));
				}
			}
		}
		return ciphered_text;
	}
	std::string cipher::normalized_cipher_text() const
	{
		std::vector<std::string> segments{plain_text_segments()};
		std::string ciphered_text{};
		for(unsigned i{0}; i < size_; ++ i)
		{
			for(unsigned j{0}; j< segments.size(); ++j)
			{
				if(i < segments.at(j).size())
				{
					ciphered_text.push_back(segments.at(j).at(i));
				}
			}
		}
		for(unsigned i{size_}; i< ciphered_text.size(); i += size_+1)
		{
			ciphered_text.insert(i, " ");
		}
		return ciphered_text;
	}
}