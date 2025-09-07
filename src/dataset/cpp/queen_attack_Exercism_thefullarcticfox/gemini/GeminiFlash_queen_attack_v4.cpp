#include "queen_attack.h"
#include <stdexcept>
#include <cmath>
#include <sstream>

using namespace std;

namespace queen_attack {
	chess_board::chess_board(const pair<int, int>& w, const pair<int, int>& b) : white_pos(w), black_pos(b) {
		if (w == b) {
			throw std::domain_error("same positions");
		}
		if (w.first < 0 || w.first > 7 || w.second < 0 || w.second > 7 ||
			b.first < 0 || b.first > 7 || b.second < 0 || b.second > 7) {
			throw std::domain_error("invalid position");
		}
	}

	chess_board::operator std::string() const {
		std::stringstream ss;
		for (int i = 0; i < 8; ++i) {
			for (int j = 0; j < 8; ++j) {
				if (white_pos.first == i && white_pos.second == j) {
					ss << 'W';
				}
				else if (black_pos.first == i && black_pos.second == j) {
					ss << 'B';
				}
				else {
					ss << '_';
				}
				ss << ' ';
			}
			ss << '\n';
		}
		return ss.str();
	}

	pair<int, int> chess_board::white() const {
		return white_pos;
	}

	pair<int, int> chess_board::black() const {
		return black_pos;
	}

	bool chess_board::can_attack() const {
		return (white_pos.first == black_pos.first ||
			white_pos.second == black_pos.second ||
			std::abs(white_pos.first - black_pos.first) == std::abs(white_pos.second - black_pos.second));
	}
}  // namespace queen_attack