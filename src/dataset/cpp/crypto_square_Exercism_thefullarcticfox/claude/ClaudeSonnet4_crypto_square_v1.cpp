#include "crypto_square.h"
#include <cmath>

namespace crypto_square {
	cipher::cipher(const std::string& text) : _text(text) {}

	std::string	cipher::normalize_plain_text() const {
		std::string	res;
		res.reserve(_text.size());
		for (char c : _text) {
			if (std::isalnum(c)) {
				res.push_back(std::tolower(c));
			}
		}
		return res;
	}

	size_t						find_cols(const size_t len) {
		if (len == 0) return 0;
		size_t	cols = static_cast<size_t>(std::ceil(std::sqrt(len)));
		size_t	rows = (len + cols - 1) / cols;
		
		if (cols - rows > 1) {
			cols = rows + 1;
		}
		return cols;
	}

	std::vector<std::string>	make_str_segments(const std::string& str, bool invert_cols = false) {
		std::vector<std::string>	res;

		if (str.empty())
			return res;

		size_t	cols = find_cols(str.size());
		if (invert_cols) {
			cols = (str.size() + cols - 1) / cols;
		}

		res.reserve((str.size() + cols - 1) / cols);
		
		for (size_t i = 0; i < str.size(); i += cols) {
			size_t segment_size = std::min(cols, str.size() - i);
			res.emplace_back(str.substr(i, segment_size));
		}

		return res;
	}

	std::vector<std::string>	cipher::plain_text_segments() const {
		return make_str_segments(normalize_plain_text());
	}

	std::string					cipher::cipher_text() const {
		std::vector<std::string>	matrix = plain_text_segments();
		std::string	res;

		if (matrix.empty())
			return res;
		
		size_t max_cols = matrix[0].size();
		res.reserve(matrix.size() * max_cols);

		for (size_t i = 0; i < max_cols; i++) {
			for (size_t j = 0; j < matrix.size(); j++) {
				if (i < matrix[j].size()) {
					res.push_back(matrix[j][i]);
				}
			}
		}
		return res;
	}

	std::string					cipher::normalized_cipher_text() const {
		std::vector<std::string>	segments = make_str_segments(cipher_text(), true);
		std::string	res;
		if (segments.empty())
			return res;

		size_t total_size = 0;
		for (const auto& segment : segments) {
			total_size += segment.size() + 1;
		}
		res.reserve(total_size);

		size_t	diff = segments.front().size() - segments.back().size();
		if (diff > 1) {
			auto& preback = segments[segments.size() - diff];
			auto& back = segments.back();

			back = preback.back() + back;
			preback.pop_back();

			preback.resize(segments.front().size(), ' ');
			back.resize(segments.front().size(), ' ');
		}

		for (size_t i = 0; i < segments.size(); ++i) {
			res += segments[i];
			if (i < segments.size() - 1) {
				res += " ";
			}
		}
		return res;
	}
}  // namespace crypto_square