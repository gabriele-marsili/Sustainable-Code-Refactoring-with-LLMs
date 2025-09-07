#include "queen_attack.h"
#include <array>

queen_attack::chess_board::chess_board() : _white{0, 3}, _black{7, 3} { }

queen_attack::chess_board::chess_board(pair<int, int> w, pair<int, int> b) : _white(w), _black(b) 
{ 
	if (_white == _black) throw domain_error("Positions cannot be the same.");
}

pair<int, int> queen_attack::chess_board::white() const { return _white; }

pair<int, int> queen_attack::chess_board::black() const { return _black; }

queen_attack::chess_board::operator string() const
{
	std::array<std::array<char, 8>, 8> board{};
	for (auto& row : board) row.fill('_');
	board[_white.first][_white.second] = 'W';
	board[_black.first][_black.second] = 'B';

	string result;
	result.reserve(128); // Preallocate for an 8x8 board with spaces and newlines
	for (const auto& row : board) {
		for (size_t j = 0; j < 8; ++j) {
			result += row[j];
			if (j < 7) result += ' ';
		}
		result += '\n';
	}
	return result;
}

bool queen_attack::chess_board::can_attack() const
{
	int row_diff = abs(_white.first - _black.first);
	int col_diff = abs(_white.second - _black.second);
	return _white.first == _black.first || _white.second == _black.second || row_diff == col_diff;
}