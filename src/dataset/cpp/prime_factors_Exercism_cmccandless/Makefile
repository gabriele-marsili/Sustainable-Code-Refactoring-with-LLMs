CXX = g++
CXXFLAGS = -std=c++17 -I src -I test -I /usr/local/include -DBOOST_TEST_DYN_LINK
LDFLAGS = -L/usr/local/lib -lboost_unit_test_framework

# Source and test files
SRC_FILES = $(wildcard src/*.cpp)
TEST_FILES = $(wildcard test/*.cpp)

# Object files
SRC_OBJ = $(patsubst src/%.cpp, obj/%.o, $(SRC_FILES))
TEST_OBJ = $(patsubst test/%.cpp, obj/%.o, $(TEST_FILES))

# Eseguibile di test
TARGET = test_exec

# Directory per gli object files
OBJ_DIR = obj

.PHONY: all clean

all: $(TARGET)

# Creazione della directory degli object files se non esiste
$(OBJ_DIR):
	mkdir -p $(OBJ_DIR)

$(TARGET): $(OBJ_DIR) $(SRC_OBJ) $(TEST_OBJ)
	@echo "🧪 Compilando l'eseguibile di test..."
	$(CXX) $(CXXFLAGS) $(SRC_OBJ) $(TEST_OBJ) -o $@ $(LDFLAGS)

$(OBJ_DIR)/%.o: src/%.cpp
	@echo "🔨 Compilando $<..."
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(OBJ_DIR)/%.o: test/%.cpp
	@echo "🔨 Compilando $<..."
	$(CXX) $(CXXFLAGS) -c $< -o $@

clean:
	rm -rf $(OBJ_DIR) $(TARGET)
