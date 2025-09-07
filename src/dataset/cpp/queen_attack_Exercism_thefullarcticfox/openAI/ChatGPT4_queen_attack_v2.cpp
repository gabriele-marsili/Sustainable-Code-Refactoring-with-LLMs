#include "queen_attack.h"
#include <stdexcept>
#include <array>
using namespace std;

namespace queen_attack {
	chess_board::chess_board(const pair<int, int>& w, const pair<int, int>& b) : white_pos(w), black_pos(b) {
		if (w == b)
			throw std::domain_error("same positions");
	}

	chess_board::operator	std::string() const {
		std::string res;
		res.reserve(128); // Reserve space for an 8x16 board
		for (int i = 0; i < 8; ++i) {
			for (int j = 0; j < 8; ++j) {
				if (white_pos == make_pair(i, j))
					res += 'W';
				else if (black_pos == make_pair(i, j))
					res += 'B';
				else
					res += '_';
				if (j < 7) res += ' ';
			}
			res += '\n';
		}
		return res;
	}

	pair<int, int>	chess_board::white() const {
		return white_pos;
	}

	pair<int, int>	chess_board::black() const {
		return black_pos;
	}

	bool			chess_board::can_attack() const {
		return (white_pos.first == black_pos.first || 
		        white_pos.second == black_pos.second || 
		        std::abs(white_pos.first - black_pos.first) == std::abs(white_pos.second - black_pos.second));
	}

}  // namespace queen_attack