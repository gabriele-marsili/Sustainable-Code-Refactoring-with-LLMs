#ifndef QUEEN_ATTACK_H_
#define QUEEN_ATTACK_H_

#include <utility>
#include <string>

namespace queen_attack
{
    class chess_board
    {
    protected:
        std::pair<int, int> m_white;
        std::pair<int, int> m_black;

    public:
        chess_board(std::pair<int, int> white = {0,3}, std::pair<int, int> black = {7,3});
        operator std::string() const;
        std::pair<int, int> white() const {return this->m_white;}
        std::pair<int, int> black() const {return this->m_black;}
        bool can_attack() const;
    };
}

#endif