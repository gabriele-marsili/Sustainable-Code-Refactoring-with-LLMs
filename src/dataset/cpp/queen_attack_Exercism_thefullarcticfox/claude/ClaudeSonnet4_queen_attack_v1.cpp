#include "queen_attack.h"
#include <stdexcept>
using namespace std;

namespace queen_attack {
	chess_board::chess_board(const pair<int, int>& w, const pair<int, int>& b) 
		: arr(8, "________"), white_pos(w), black_pos(b) {
		if (w == b)
			throw std::domain_error("same positions");
		arr[w.first][w.second] = 'W';
		arr[b.first][b.second] = 'B';
	}

	chess_board::operator	std::string() const {
		std::string	res;
		res.reserve(128);
		for (size_t i = 0; i < 8; i++) {
			for (size_t j = 0; j < 8; j++) {
				res += arr[i][j];
				res += ' ';
			}
			res.back() = '\n';
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