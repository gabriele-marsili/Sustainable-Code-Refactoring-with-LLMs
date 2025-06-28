#ifndef QUEEN_ATTACK_H
#define QUEEN_ATTACK_H

#include <string>
#include <utility>
#include <iostream>
#include <stdexcept>

namespace queen_attack {
	class chess_board {
	private:
		
		std::pair<int, int> whiteChess;
		std::pair<int, int> blackChess;
	public:
		chess_board();
		chess_board(std::pair<int, int> whiteChess, std::pair<int, int> blackChess);
		operator std::string() const;
		std::pair<int, int> white() const;
		std::pair<int, int> black() const;
		bool can_attack() const;

	};
}
#endif // !QUEEN_ATTACK_H

