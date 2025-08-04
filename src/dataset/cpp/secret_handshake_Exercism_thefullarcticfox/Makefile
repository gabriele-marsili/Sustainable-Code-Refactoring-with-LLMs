CXX = g++
CXXFLAGS = -std=c++17 -I src -I test -I /usr/local/include -I.

# Source and test files (dynamically detected)
SRC_FILES = $(wildcard src/*.cpp)
TEST_FILES = $(wildcard test/*.cpp)

# Object files
SRC_OBJ = $(patsubst src/%.cpp, obj/%.o, $(SRC_FILES))
TEST_OBJ = $(patsubst test/%.cpp, obj/%.o, $(TEST_FILES))
CATCH_MAIN_OBJ = obj/catch_main.o
CATCH_AMALGAMATED_OBJ = obj/catch_amalgamated.o # Object file for catch_amalgamated.cpp

# Eseguibile di test
TARGET = test_exec

# Directory per gli object files
OBJ_DIR = obj

.PHONY: all clean

all: $(TARGET)

# Creazione della directory degli object files se non esiste
$(OBJ_DIR):
	mkdir -p $(OBJ_DIR)

$(TARGET): $(OBJ_DIR) $(SRC_OBJ) $(TEST_OBJ) $(CATCH_MAIN_OBJ) $(CATCH_AMALGAMATED_OBJ)
	@echo "🧪 Linking test eseguibile con Catch2..."
	$(CXX) $(CXXFLAGS) $(SRC_OBJ) $(TEST_OBJ) $(CATCH_MAIN_OBJ) $(CATCH_AMALGAMATED_OBJ) -o $@

# Compila i file sorgente dalla directory src (regola generica)
$(OBJ_DIR)/%.o: src/%.cpp
	@echo "🔨 Compilando $<..."
	$(CXX) $(CXXFLAGS) -c $< -o $@

# Compila i file di test dalla directory test (regola generica)
$(OBJ_DIR)/%.o: test/%.cpp
	@echo "🔨 Compilando $<..."
	$(CXX) $(CXXFLAGS) -c $< -o $@

# Compila catch_main.cpp
$(OBJ_DIR)/catch_main.o: catch_main.cpp
	@echo "🔨 Compilando catch_main.cpp..."
	$(CXX) $(CXXFLAGS) -c catch_main.cpp -o $@

# Compila catch_amalgamated.cpp
$(OBJ_DIR)/catch_amalgamated.o: catch_amalgamated.cpp
	@echo "🔨 Compilando catch_amalgamated.cpp..."
	$(CXX) $(CXXFLAGS) -c catch_amalgamated.cpp -o $@

clean:
	rm -rf $(OBJ_DIR) $(TARGET)