import re
import argparse
import os
import shutil
from pathlib import Path

BASE_DIR = Path("../dataset/cpp")

DEFAULT_MAKEFILE = """\
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
	@if [ -f /usr/local/src/catch_amalgamated.cpp ]; then \
		$(CXX) $(CXXFLAGS) -o test_exec $(OBJ) /usr/local/src/catch_amalgamated.cpp; \
	else \
		$(CXX) $(CXXFLAGS) -o test_exec $(OBJ); \
	fi
else ifeq ($(TEST_FRAMEWORK),boost)
	@echo "🧪 Compilando con Boost.Test..."
	@if command -v pkg-config > /dev/null && pkg-config --exists boost; then \
		$(CXX) $(CXXFLAGS) -o test_exec $(OBJ) $(LDFLAGS); \
	else \
		echo "⚠️  Boost non disponibile, tentativo senza librerie..."; \
		$(CXX) $(CXXFLAGS) -o test_exec $(OBJ) -lboost_unit_test_framework 2>/dev/null || \
		$(CXX) $(CXXFLAGS) -o test_exec $(OBJ); \
	fi
else
	@echo "🧪 Framework sconosciuto, tentativo con Boost..."
	@$(CXX) $(CXXFLAGS) -o test_exec $(OBJ) $(LDFLAGS) 2>/dev/null || \
	echo "⚠️  Boost fallito, tentativo senza librerie..." && \
	$(CXX) $(CXXFLAGS) -o test_exec $(OBJ)
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
"""


"""Adjuster class to fix dataset files"""
class Adjuster:
    def __init__(self):
        pass

    def fix_makefile(self, makefile_path: Path):       
        self.create_default_makefile(makefile_path.parent)
        return
     
    def create_default_makefile(self, target_dir: Path):
        makefile_path = target_dir / "Makefile"
        makefile_path.write_text(DEFAULT_MAKEFILE, encoding="utf-8")
        print(f"🆕 Makefile creato: {makefile_path}")

    def fix_includes_in_test_files(self, test_dir: Path):
        for test_file in test_dir.glob("test_*.c"):
            content = test_file.read_text(encoding="utf-8")
            new_content = re.sub(
                r'#include\s+"(?:test-framework|test/vendor)/unity.h"',
                '#include "unity.h"',
                content
            )
            if new_content != content:
                test_file.write_text(new_content, encoding="utf-8")
                print(f"✏️ Fixato include in: {test_file}")

    def adjust_makefiles(self):
        for exercise_dir in BASE_DIR.iterdir():
            if not exercise_dir.is_dir():
                continue

            makefile_path = None
            for name in ["Makefile", "makefile"]:
                candidate = exercise_dir / name
                if candidate.exists():
                    if name == "makefile":
                        print(f"🔃 Rinomino 'makefile' in 'Makefile': {candidate}")
                        target = exercise_dir / "Makefile"
                        candidate.rename(target)
                        makefile_path = target
                    else:
                        makefile_path = candidate
                    break

            if makefile_path is None:
                self.create_default_makefile(exercise_dir)
            else:
                self.fix_makefile(makefile_path)

            test_dir = exercise_dir / "test"
            if test_dir.exists():
                self.fix_includes_in_test_files(test_dir)

                    

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sistema Makefile ed include Unity")
    parser.add_argument(
        '--operations', '-op',
        nargs='+',
        default=['include_unity'],
        help='Operazioni da eseguire'
    )

    args = parser.parse_args()
    adjuster = Adjuster()

    print(f"args.operations = {args.operations}")
    for op in args.operations:       
        if op == "adjust_makefiles":
            adjuster.adjust_makefiles()
