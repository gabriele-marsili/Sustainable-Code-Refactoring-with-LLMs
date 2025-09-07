#include <string>
#include "queen_attack.h"

namespace queen_attack {
    typedef std::pair<int, int> square;

    square chess_board::white() const {
        return white_queen;
    }

    square chess_board::black() const {
        return black_queen;
    }

    bool chess_board::can_attack() const {
        return white_queen.first == black_queen.first || 
               white_queen.second == black_queen.second || 
               abs(white_queen.first - black_queen.first) == abs(white_queen.second - black_queen.second);
    }

    chess_board::operator std::string() const {
        std::string chessBoard;
        chessBoard.reserve(128); // Preallocate for an 8x8 board with spaces and newlines
        for (int i = 0; i < 8; ++i) {
            for (int j = 0; j < 8; ++j) {
                if (white_queen == std::make_pair(i, j)) {
                    chessBoard += 'W';
                } else if (black_queen == std::make_pair(i, j)) {
                    chessBoard += 'B';
                } else {
                    chessBoard += '_';
                }
                if (j < 7) {
                    chessBoard += ' ';
                }
            }
            chessBoard += '\n';
        }
        return chessBoard;
    }
}