CC = gcc
CFLAGS = -Isrc -Itest
SRC = $(wildcard src/*.c)
TEST = $(filter-out test/unity.c, $(wildcard test/*.c))
OBJS = $(SRC:.c=.o) $(TEST:.c=.o) test/unity.o

tests.out: $(OBJS)
	$(CC) $(OBJS) -o tests.out
	chmod +x tests.out

clean:
	rm -f src/*.o test/*.o tests.out
