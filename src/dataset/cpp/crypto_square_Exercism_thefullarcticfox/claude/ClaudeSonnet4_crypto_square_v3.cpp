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
		
		for (size_t cols = sqrt_len; cols <= len; ++cols) {
			size_t rows = (len + cols - 1) / cols;
			if (cols - rows <= 1) {
				return cols;
			}
		}
		return len;
	}

	std::vector<std::string> make_str_segments(const std::string& str, bool invert_cols = false) {
		std::vector<std::string> res;
		
		if (str.empty()) {
			return res;
		}

		size_t cols = find_cols(str.size());
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

	std::vector<std::string> cipher::plain_text_segments() const {
		return make_str_segments(normalize_plain_text());
	}

	std::string cipher::cipher_text() const {
		std::vector<std::string> matrix = plain_text_segments();
		std::string res;

		if (matrix.empty()) {
			return res;
		}

		size_t max_cols = 0;
		for (const auto& row : matrix) {
			max_cols = std::max(max_cols, row.size());
		}

		res.reserve(matrix.size() * max_cols);

		for (size_t col = 0; col < max_cols; ++col) {
			for (const auto& row : matrix) {
				if (col < row.size()) {
					res.push_back(row[col]);
				}
			}
		}
		return res;
	}

	std::string cipher::normalized_cipher_text() const {
		std::vector<std::string> segments = make_str_segments(cipher_text(), true);
		
		if (segments.empty()) {
			return std::string();
		}

		if (segments.size() > 1) {
			size_t target_size = segments.front().size();
			size_t diff = target_size - segments.back().size();
			
			if (diff > 1 && segments.size() >= diff + 1) {
				auto& source = segments[segments.size() - diff - 1];
				auto& target = segments.back();
				
				target = source.back() + target;
				source.pop_back();
				
				source.resize(target_size, ' ');
				target.resize(target_size, ' ');
			}
		}

		std::string res;
		size_t total_size = 0;
		for (const auto& segment : segments) {
			total_size += segment.size() + 1;
		}
		res.reserve(total_size);

		for (size_t i = 0; i < segments.size(); ++i) {
			res += segments[i];
			if (i < segments.size() - 1) {
				res += " ";
			}
		}
		
		return res;
	}
}