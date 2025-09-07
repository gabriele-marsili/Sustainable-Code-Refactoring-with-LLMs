#include "queen_attack.h"
#include <sstream>
#include <stdexcept>
#include <cmath>

queen_attack::chess_board::chess_board() : _white({0,3}), _black({7,3}) { }

queen_attack::chess_board::chess_board(pair<int, int> w, pair<int, int> b) : _white(w), _black(b)
{
	if (_white == _black) throw domain_error("Positions cannot be the same.");
}

pair<int, int> queen_attack::chess_board::white() const { return _white; }

pair<int, int> queen_attack::chess_board::black() const { return _black; }

queen_attack::chess_board::operator string() const
{
	std::string board_str;
	board_str.reserve(8 * 9 * 8); // Pre-allocate memory for the entire string

	for (int i = 0; i < 8; ++i)
	{
		for (int j = 0; j < 8; ++j)
		{
			if (_white.first == i && _white.second == j) board_str += 'W';
			else if (_black.first == i && _black.second == j) board_str += 'B';
			else board_str += '_';

			if (j < 7) board_str += ' ';
		}
		board_str += '\n';
	}
	return board_str;
}

bool queen_attack::chess_board::can_attack() const
{
	int row_diff = _white.first - _black.first;
	int col_diff = _white.second - _black.second;
	return row_diff == 0 || col_diff == 0 || std::abs(row_diff) == std::abs(col_diff);
}