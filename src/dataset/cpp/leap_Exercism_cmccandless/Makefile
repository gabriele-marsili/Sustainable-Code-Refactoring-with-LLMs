CXX = g++
CXXFLAGS = -std=c++17 -I src -I test -I /usr/local/include
LDFLAGS = -lboost_unit_test_framework
SRC = $(wildcard src/*.cpp)
TEST = $(wildcard test/*.cpp)
OBJ = $(SRC:.cpp=.o) $(TEST:.cpp=.o)

# Rileva automaticamente il tipo di test framework
TEST_FRAMEWORK = $(shell if grep -q "catch.hpp\|catch2" test/*.cpp 2>/dev/null; then echo "catch"; elif grep -q "boost.*test" test/*.cpp 2>/dev/null; then echo "boost"; else echo "unknown"; fi)

# Verifica se boost è disponibile
BOOST_AVAILABLE = $(shell pkg-config --exists boost 2>/dev/null && echo "yes" || echo "no")

all: test_exec

test_exec: $(OBJ)
ifeq ($(TEST_FRAMEWORK),catch)
	@echo "🧪 Compilando con Catch2..."
	@if [ -f /usr/local/src/catch_amalgamated.cpp ]; then 		$(CXX) $(CXXFLAGS) -o test_exec $(OBJ) /usr/local/src/catch_amalgamated.cpp; 	else 		$(CXX) $(CXXFLAGS) -o test_exec $(OBJ); 	fi
else ifeq ($(TEST_FRAMEWORK),boost)
	@echo "🧪 Compilando con Boost.Test..."
	@if command -v pkg-config > /dev/null && pkg-config --exists boost; then 		$(CXX) $(CXXFLAGS) -o test_exec $(OBJ) $(LDFLAGS); 	else 		echo "⚠️  Boost non disponibile, tentativo senza librerie..."; 		$(CXX) $(CXXFLAGS) -o test_exec $(OBJ) -lboost_unit_test_framework 2>/dev/null || 		$(CXX) $(CXXFLAGS) -o test_exec $(OBJ); 	fi
else
	@echo "🧪 Framework sconosciuto, tentativo con Boost..."
	@$(CXX) $(CXXFLAGS) -o test_exec $(OBJ) $(LDFLAGS) 2>/dev/null || 	echo "⚠️  Boost fallito, tentativo senza librerie..." && 	$(CXX) $(CXXFLAGS) -o test_exec $(OBJ)
endif

%.o: %.cpp
	@echo "🔨 Compilando $<..."
	$(CXX) $(CXXFLAGS) -c $< -o $@

clean:
	rm -f src/*.o test/*.o test_exec

.PHONY: all clean debug

debug:
	@echo "Framework rilevato: $(TEST_FRAMEWORK)"
	@echo "Boost disponibile: $(BOOST_AVAILABLE)"
	@echo "File sorgente: $(SRC)"
	@echo "File test: $(TEST)"
	@echo "File oggetto: $(OBJ)"
