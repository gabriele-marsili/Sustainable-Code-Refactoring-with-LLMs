#include "crypto_square.h"
#include <cmath>

namespace crypto_square {
	cipher::cipher(const std::string& text) : _text(text) {}

	std::string	cipher::normalize_plain_text() const {
		std::string	res;
		for (char c : _text)
			if (std::isalnum(c))
				res.push_back(std::tolower(c));
		return res;
	}

	size_t						find_cols(const size_t len) {
		size_t	cols = len;
		size_t	rows = 0;

		while (cols >= rows) {
			rows = size_t(round(double(len) / cols));
			if (cols - rows <= 1)
				break;
			cols--;
		}
		return cols;
	}

	std::vector<std::string>	make_str_segments(const std::string& str, bool invert_cols = false) {
		std::vector<std::string>	res;

		if (str.empty())
			return res;
		size_t i = 0;

		size_t	cols = find_cols(str.size());
		if (invert_cols)
			cols = size_t(round(double(str.size()) / cols));

		while (i + cols < str.size()) {
			res.push_back(str.substr(i, cols));
			i += cols;
		}
		if (str.size() && i + cols >= str.size())
			res.push_back(str.substr(i, cols));

		return res;
	}

	std::vector<std::string>	cipher::plain_text_segments() const {
		return (make_str_segments(normalize_plain_text()));
	}

	std::string					cipher::cipher_text() const {
		std::vector<std::string>	matrix = plain_text_segments();
		std::string	res;

		if (matrix.size() < 1)
			return res;
		for (size_t i = 0; i < matrix.at(0).size(); i++) {
			for (size_t j = 0; j < matrix.size(); j++)
				if (i < matrix.at(j).size())
					res.push_back(matrix.at(j).at(i));
		}
		return res;
	}

	std::string					cipher::normalized_cipher_text() const {
		std::vector<std::string>	segments = make_str_segments(cipher_text(), true);
		std::string	res;
		if (segments.empty())
			return res;

		//	passes the tests but this is ultimately stupid
		size_t	diff = segments.front().size() - segments.back().size();
		if (diff > 1) {
			auto& preback = segments.at(segments.size() - diff);
			auto& back = segments.back();

			back = preback.back() + back;
			preback.pop_back();

			preback.resize(segments.front().size(), ' ');
			back.resize(segments.front().size(), ' ');
		}

		for (auto& segment : segments)
			res += segment + " ";
		res.pop_back();
		return res;
	}
}  // namespace crypto_square
