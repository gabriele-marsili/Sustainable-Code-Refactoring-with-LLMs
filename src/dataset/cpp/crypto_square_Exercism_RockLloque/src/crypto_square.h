#ifndef CRYPTO_SQUARE_H
#define CRYPTO_SQUARE_H

#include <string>
#include <vector>


namespace crypto_square
{
	class cipher 
	{
		public:
			cipher(std::string const&);

			std::string normalize_plain_text();
			unsigned size() const;
			std::vector<std::string> plain_text_segments() const;
			std::string cipher_text() const;
			std::string normalized_cipher_text() const;
		private:

			void normalize();
			std::string text_;
			unsigned size_;
	};
}


#endif