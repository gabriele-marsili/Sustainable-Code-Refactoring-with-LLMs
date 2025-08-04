#include "queen_attack.h"

#include <iostream>
#include <stdexcept>


namespace queen_attack {
	chess_board::chess_board(position white, position black) : m_white{white}, m_black{black} {
		if (white == black) throw std::domain_error("Black and white positions cannot be the same.");
	}

	position chess_board::white() const {
		return m_white;
	}

	position chess_board::black() const {
		return m_black;
	}

	bool chess_board::can_attack() const {
		return m_white.first == m_black.first
			   || m_white.second == m_black.second
			   || std::abs(m_white.first - m_black.first)
		            == std::abs(m_white.second - m_black.second);
	}

	chess_board::operator std::string() const {
		const std::string row{ "_ _ _ _ _ _ _ _\n" };
		std::string board{ row + row + row + row + row + row + row + row };

		board[m_white.first * 16 + m_white.second * 2] = 'W';
		board[m_black.first * 16 + m_black.second * 2] = 'B';

		return board;
	}
}  // namespace queen_attack
