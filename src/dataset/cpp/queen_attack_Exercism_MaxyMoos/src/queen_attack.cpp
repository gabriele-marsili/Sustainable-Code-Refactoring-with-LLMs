#include "queen_attack.h"
#include <stdexcept>
#include <iostream>

namespace queen_attack
{
    chess_board::chess_board(std::pair<int, int> white, std::pair<int, int> black)
    {
        if (white == black)
            throw std::domain_error("Positions cannot be equal");

        this->m_white = white;
        this->m_black = black;
    }

    chess_board::operator std::string() const
    {
        std::string result = "";
        std::string emptyLine = "________";
        std::string board[8] { emptyLine, emptyLine, emptyLine, emptyLine, emptyLine, emptyLine, emptyLine, emptyLine };

        board[this->m_white.first][this->m_white.second] = 'W';
        board[this->m_black.first][this->m_black.second] = 'B';
        
        for (auto i: board)
        {
            for (auto j: i)
            {
                result.push_back(j);
                result += " ";
            }
            result.pop_back();
            result.push_back('\n');
        }
        return result;
    }

    bool chess_board::can_attack() const
    {
        if (this->m_white.first == this->m_black.first || this->m_white.second == this->m_black.second)
            return true;
        if (this->m_white.second - this->m_white.first == this->m_black.second - this->m_black.first)
            return true;
        if (this->m_white.first + this->m_white.second == this->m_black.first + this->m_black.second)
            return true;
        return false;
    }
}