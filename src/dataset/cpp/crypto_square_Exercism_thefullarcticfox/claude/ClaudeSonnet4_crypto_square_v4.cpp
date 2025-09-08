#include "crypto_square.h"
#include <cmath>
#include <algorithm>

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

	size_t find_cols(const size_t len) {
		if (len == 0) return 0;
		size_t sqrt_len = static_cast<size_t>(std::sqrt(len));
		size_t cols = sqrt_len;
		while (cols * cols < len) {
			cols++;
		}
		while (cols > 0 && (cols - 1) * cols >= len) {
			cols--;
		}
		return cols;
	}

	std::vector<std::string> make_str_segments(const std::string& str, bool invert_cols = false) {
		std::vector<std::string> res;
		if (str.empty()) return res;

		size_t cols = find_cols(str.size());
		if (invert_cols) {
			cols = (str.size() + cols - 1) / cols;
		}

		res.reserve((str.size() + cols - 1) / cols);
		for (size_t i = 0; i < str.size(); i += cols) {
			res.emplace_back(str.substr(i, std::min(cols, str.size() - i)));
		}
		return res;
	}

	std::vector<std::string> cipher::plain_text_segments() const {
		return make_str_segments(normalize_plain_text());
	}

	std::string cipher::cipher_text() const {
		const std::vector<std::string> matrix = plain_text_segments();
		if (matrix.empty()) return std::string();

		std::string res;
		size_t max_cols = matrix[0].size();
		res.reserve(matrix.size() * max_cols);

		for (size_t col = 0; col < max_cols; ++col) {
			for (size_t row = 0; row < matrix.size(); ++row) {
				if (col < matrix[row].size()) {
					res.push_back(matrix[row][col]);
				}
			}
		}
		return res;
	}

	std::string cipher::normalized_cipher_text() const {
		std::vector<std::string> segments = make_str_segments(cipher_text(), true);
		if (segments.empty()) return std::string();

		size_t max_size = segments[0].size();
		size_t total_size = 0;
		for (const auto& segment : segments) {
			total_size += std::max(segment.size(), max_size) + 1;
		}
		
		std::string res;
		res.reserve(total_size);

		for (size_t i = 0; i < segments.size(); ++i) {
			segments[i].resize(max_size, ' ');
			res += segments[i];
			if (i < segments.size() - 1) {
				res += " ";
			}
		}
		return res;
	}
}