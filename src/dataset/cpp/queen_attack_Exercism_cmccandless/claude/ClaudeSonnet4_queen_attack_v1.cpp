#include "queen_attack.h"

queen_attack::chess_board::chess_board() : _white(0, 3), _black(7, 3) { }

queen_attack::chess_board::chess_board(pair<int, int> w, pair<int, int> b) : _white(w), _black(b) 
{ 
	if (_white == _black) throw domain_error("Positions cannot be the same.");
}

pair<int, int> queen_attack::chess_board::white() const { return _white; }

pair<int, int> queen_attack::chess_board::black() const { return _black; }

queen_attack::chess_board::operator string() const
{
	string result;
	result.reserve(136); // 8*8 chars + 7*8 spaces + 8 newlines
	
	for (int i = 0; i < 8; ++i)
	{
		for (int j = 0; j < 8; ++j)
		{
			if (i == _white.first && j == _white.second) result += 'W';
			else if (i == _black.first && j == _black.second) result += 'B';
			else result += '_';
			if (j < 7) result += ' ';
		}
		result += '\n';
	}
	return result;
}

bool queen_attack::chess_board::can_attack() const
{
	const int row_diff = _white.first - _black.first;
	const int col_diff = _white.second - _black.second;
	return row_diff == 0 || col_diff == 0 || 
		   (row_diff < 0 ? -row_diff : row_diff) == (col_diff < 0 ? -col_diff : col_diff);
}