#!/usr/bin/env python3
import os
import sys
# Aggiungi la directory parent (src) al path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from utility_dir import utility_paths

import json 
import re
import shutil
from pathlib import Path

BASE_DIR = Path("../dataset/cpp")
DATASET_JSON_FILEPATH = Path("../dataset/dataset.json")
DOCKER_DIR = Path("../docker/cpp")
BAD_ENTRIES_CLUSTER_PATH = Path("../clusters/bad_entries_cluster.json")

DEFAULT_MAKEFILE = """CXX = g++
CXXFLAGS = -std=c++17 -I src -I test -I /usr/local/include -I/usr/include/boost
BOOST_LDFLAGS = -L/usr/lib/x86_64-linux-gnu -lboost_unit_test_framework
CATCH_LDFLAGS = 

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

# Detect test framework
CATCH_TEST := $(shell grep -l "catch.hpp\|catch2.hpp\|catch2/catch.hpp\|catch_amalgamated.hpp" test/*.cpp 2>/dev/null || true)
BOOST_TEST := $(shell grep -l "boost/test\|BOOST_TEST" test/*.cpp 2>/dev/null || true)

.PHONY: all clean detect-framework

all: detect-framework $(TARGET)

detect-framework:
	@echo "🔍 Rilevamento framework di test..."
ifneq ($(CATCH_TEST),)
	@echo "📋 Rilevato Catch2 test framework"
	$(eval CXXFLAGS += -DUSE_CATCH2)
	$(eval LDFLAGS = $(CATCH_LDFLAGS))
else ifneq ($(BOOST_TEST),)
	@echo "🚀 Rilevato Boost.Test framework"  
	$(eval CXXFLAGS += -DBOOST_TEST_DYN_LINK)
	$(eval LDFLAGS = $(BOOST_LDFLAGS))
else
	@echo "⚠️  Nessun framework di test rilevato, uso Boost come default"
	$(eval CXXFLAGS += -DBOOST_TEST_DYN_LINK)
	$(eval LDFLAGS = $(BOOST_LDFLAGS))
endif

# Creazione della directory degli object files se non esiste
$(OBJ_DIR):
	mkdir -p $(OBJ_DIR)

$(TARGET): $(OBJ_DIR) $(SRC_OBJ) $(TEST_OBJ)
	@echo "🧪 Compilando l'eseguibile di test..."
ifneq ($(CATCH_TEST),)
	@echo "🔗 Linking con Catch2..."
	# Se usiamo Catch2, includiamo catch_main.cpp se esiste
	@if [ -f "catch_main.cpp" ]; then \
		echo "📄 Compilando catch_main.cpp..."; \
		$(CXX) $(CXXFLAGS) -c catch_main.cpp -o obj/catch_main.o; \
		$(CXX) $(CXXFLAGS) $(SRC_OBJ) $(TEST_OBJ) obj/catch_main.o -o $@ $(LDFLAGS); \
	else \
		$(CXX) $(CXXFLAGS) $(SRC_OBJ) $(TEST_OBJ) -o $@ $(LDFLAGS); \
	fi
else
	@echo "🔗 Linking con Boost.Test..."
	# Usa -lboost_unit_test_framework per linkare la libreria.
	# Aggiungi -L/usr/lib/x86_64-linux-gnu per specificare esplicitamente il percorso della libreria Boost.
	$(CXX) $(CXXFLAGS) -o $@ $(SRC_OBJ) $(TEST_OBJ) $(LDFLAGS)
endif

$(OBJ_DIR)/%.o: src/%.cpp
	@echo "🔨 Compilando $<..."
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(OBJ_DIR)/%.o: test/%.cpp
	@echo "🔨 Compilando $<..."
	$(CXX) $(CXXFLAGS) -c $< -o $@

clean:
	rm -f src/*.o test/*.o $(TARGET)
	rm -rf $(OBJ_DIR)
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
        
    def find_catch_files(self):
        with open(utility_paths.DATASET_JSON_FILEPATH,"r",encoding="utf-8") as f : 
            data = json.load(f)
            
        entry_arr = []
        if data : 
            cpp_entries = data['cpp']
            for entry in cpp_entries : 
                t_path = (str(entry['testUnitFilePath'])) + "/"+(str(entry['filename']).replace(".cpp","_test.cpp"))                
                test_file_path = utility_paths.DATASET_DIR / t_path                
                is_cpp_catch_test = False
                with open(test_file_path,"r", encoding='utf-8') as f:
                    content = f.read()
                    if '#include "test/catch.hpp"' in content:
                        is_cpp_catch_test = True

                if is_cpp_catch_test :
                    entry_arr.append(entry)

            p = float((len(entry_arr)/len(cpp_entries)*100))
            print(f"\nfound {len(entry_arr)}/{len(cpp_entries)} ({p:.1f}%) entries (catch)")
            content = {
                "cpp" : entry_arr
            }
            
            with open(utility_paths.BAD_ENTRIES_CLUSTER_FILEPATH,"w",encoding="utf-8") as f:
                json.dump(content,f, indent=4)
                print(f"\nupdated {utility_paths.BAD_ENTRIES_CLUSTER_FILEPATH}")

        
    def adjust_catch_files(self):
        for exercise_dir in BASE_DIR.iterdir():
            if not exercise_dir.is_dir():
                continue
            
            src_file = DOCKER_DIR / "catch_amalgamated.cpp"            
            shutil.copy(src_file, exercise_dir)
            src_file = DOCKER_DIR / "catch_amalgamated.hpp"
            shutil.copy(src_file, exercise_dir)            
            src_file = DOCKER_DIR / "catch_main.cpp"
            shutil.copy(src_file, exercise_dir)
            self.counter += 1
        
        print(f"adjuster {self.counter} catch files")
       
        
            
            

                    


if __name__ == "__main__":
        
    adjuster = Adjuster()  
    adjuster.adjust_makefiles()
    #adjuster.adjust_catch_files()
    #adjuster.find_catch_files()
