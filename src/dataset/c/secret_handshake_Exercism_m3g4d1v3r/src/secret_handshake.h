#ifndef SECRET_HANDSHAKE_H
#define SECRET_HANDSHAKE_H

#define ARRAY_LEN(x) sizeof(x) / sizeof(x[0])

#include <stdbool.h>
#include <stddef.h>
#include <stdlib.h>
#include <string.h>

const char **commands(size_t number);

#endif
