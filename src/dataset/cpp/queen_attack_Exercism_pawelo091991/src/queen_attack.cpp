#include "queen_attack.h"

queen_attack::chess_board::chess_board() {
	whiteChess.first = 0;
	whiteChess.second = 3;
	blackChess.first = 7;
	blackChess.second = 3;
}

queen_attack::chess_board::chess_board(std::pair<int, int> whiteChess, std::pair<int, int> blackChess)
{
	this->whiteChess.first = whiteChess.first;
	this->whiteChess.second = whiteChess.second;
	this->blackChess.first = blackChess.first;
	this->blackChess.second = blackChess.second;
	if (this->whiteChess == this->blackChess)
		throw std::domain_error("The same position of white and black Chess");
}

std::pair<int, int> queen_attack::chess_board::white() const {
	return whiteChess;
}

std::pair<int, int> queen_attack::chess_board::black() const {
	return blackChess;
}

bool queen_attack::chess_board::can_attack() const {

	if (whiteChess.first == blackChess.first)
		return true;

	if (whiteChess.second == blackChess.second)
		return true;

	//check for diagonal solution, easy implementation but not efficient - it checks also solutions that may not exist
	for (int i = 1; i < 8; i++) {
		if (whiteChess.first + i == blackChess.first && whiteChess.second + i == blackChess.second)
			return true;
		else if (whiteChess.first + i == blackChess.first && whiteChess.second - i == blackChess.second)
			return true;
		else if (whiteChess.first - i == blackChess.first && whiteChess.second + i == blackChess.second)
			return true;
		else if (whiteChess.first - i == blackChess.first && whiteChess.second - i == blackChess.second)
			return true;
			
	}
	return false;
}


queen_attack::chess_board::operator std::string() const{
	std::string board = "";
	char arr[8][8];
	for (int i = 0; i < 8; i++) {
		for (int j = 0; j < 8; j++) {
			if (i == whiteChess.first && j == whiteChess.second) 
				arr[i][j] = 'W';	
			else if (i == blackChess.first && j == blackChess.second)
				arr[i][j] = 'B';
			else
				arr[i][j] = '_';
			
			board += arr[i][j];
			if (j != 7)
				board += ' ';
		}
		board += '\n';
	}

	return board;
}