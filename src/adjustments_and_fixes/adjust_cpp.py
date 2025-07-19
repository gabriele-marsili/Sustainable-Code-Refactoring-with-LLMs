import re
import argparse
import os
import shutil
from pathlib import Path

BASE_DIR = Path("../dataset/cpp")

DEFAULT_MAKEFILE = """CXX = g++
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
"""

"""Adjuster class to fix dataset files"""
class Adjuster:
    def __init__(self):
        self.counter = 0
        pass

    def fix_makefile(self, makefile_path: Path):       
        self.create_default_makefile(makefile_path.parent)
        return
     
    def create_default_makefile(self, target_dir: Path):
        makefile_path = target_dir / "Makefile"
        makefile_path.write_text(DEFAULT_MAKEFILE, encoding="utf-8")
        print(f"🆕 Makefile creato: {makefile_path}")
        self.counter +=1

    def fix_includes_in_test_files(self, test_dir: Path):
        for test_file in test_dir.glob("test_*.cpp"):
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
            
            self.create_default_makefile(exercise_dir)
            
            
            test_dir = exercise_dir / "test"
            if test_dir.exists():
                self.fix_includes_in_test_files(test_dir)
                
        print(f"\nMakefile adjusted for {self.counter} files")

                    


if __name__ == "__main__":
        
    adjuster = Adjuster()  
    adjuster.adjust_makefiles()
