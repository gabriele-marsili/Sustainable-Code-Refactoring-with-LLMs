#include <sstream>
#include "queen_attack.h"
#include <cmath>

using namespace std;

namespace queen_attack {
    typedef std::pair<int, int> square;

    square chess_board::white() const {
        return white_queen;
    }

    square chess_board::black() const {
        return black_queen;
    }

    bool chess_board::can_attack() const {
        int white_queen_row = white_queen.first;
        int white_queen_column = white_queen.second;
        int black_queen_row = black_queen.first;
        int black_queen_column = black_queen.second;

        if (white_queen_row == black_queen_row) {
            return true;
        }
        if (white_queen_column == black_queen_column) {
            return true;
        }

        return abs(white_queen_row - black_queen_row) == abs(white_queen_column - black_queen_column);
    }

    chess_board::operator std::string() const {
        stringstream chessBoard;
        for (int i = 0; i <= 7; ++i) {
            for (int j = 0; j <= 7; ++j) {
                if (white_queen.first == i && white_queen.second == j) {
                    chessBoard << 'W';
                } else if (black_queen.first == i && black_queen.second == j) {
                    chessBoard << 'B';
                } else {
                    chessBoard << '_';
                }
                if (j < 7) {
                    chessBoard << ' ';
                }
            }
            chessBoard << endl;
        }
        return chessBoard.str();
    }
}