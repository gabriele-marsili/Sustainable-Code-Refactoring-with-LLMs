#if !defined(SECRET_HANDSHAKE_H)
#define SECRET_HANDSHAKE_H

#include <vector>
#include <string>

namespace secret_handshake {
	using commandList = std::vector<std::string>;
    commandList commands(int command);
}  // namespace secret_handshake

#endif // SECRET_HANDSHAKE_H
