CC = gcc
CFLAGS = -I./src -Wall
SRC = src/*.c test/*.c 
OBJ = $(SRC:.c=.o)

tests.out: $(OBJ)
	$(CC) $(OBJ) -o tests.out

clean:
	rm -f $(OBJ) tests.out
