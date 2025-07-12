import re
import argparse
import os
import shutil
from pathlib import Path

BASE_DIR = Path("../dataset/c")

DEFAULT_MAKEFILE = """\
CC = gcc
CFLAGS = -I./src -Wall
SRCS := $(wildcard src/*.c test/*.c)
OBJS := $(SRCS:.c=.o)
TARGET = test

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CC) $(CFLAGS) -o $@ $^

%.o: %.c
	$(CC) $(CFLAGS) -c -o $@ $<

clean:
	rm -f $(OBJS) $(TARGET)
"""


"""Adjuster class to fix dataset files"""
class Adjuster:
    def __init__(self):
        pass

    def sposta_unity_files(self, path_esercizio):
        test_dir = os.path.join(path_esercizio, "test")
        vendor_dir = os.path.join(test_dir, "vendor")
        unity_files = ["unity.c", "unity.h", "unity_internals.h"]

        if not os.path.isdir(vendor_dir):
            print(f"📁 Cartella vendor non trovata in {vendor_dir}")
            return

        for f in unity_files:
            src_file = os.path.join(vendor_dir, f)
            dest_file = os.path.join(test_dir, f)

            if os.path.isfile(src_file):
                print(f"📦 Spostando {f} in {test_dir}")
                shutil.move(src_file, dest_file)
            else:
                print(f"❌ File mancante in vendor: {f}")

        if not os.listdir(vendor_dir):
            print(f"🧹 Cartella {vendor_dir} vuota, la rimuovo")
            os.rmdir(vendor_dir)

    def adjust_vendor(self):
        print(f"📂 Base dir = {BASE_DIR}")
        for exercise_dir in BASE_DIR.iterdir():
            if exercise_dir.is_dir():
                self.sposta_unity_files(exercise_dir)

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

    def update_include_unity(self):
        for esercizio_dir in BASE_DIR.iterdir():
            if not esercizio_dir.is_dir():
                continue
            test_dir = esercizio_dir / "test"
            if not test_dir.exists():
                continue
            for file in test_dir.glob("test_*.c"):
                content = file.read_text()
                if '"vendor/unity.h"' in content:
                    print(f"🔧 Modifico include in {file}")
                    content = content.replace('"vendor/unity.h"', '"unity.h"')
                    file.write_text(content)
                    
                    

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
        if op == "include_unity":
            adjuster.update_include_unity()
        elif op == "fix_vendor":
            adjuster.adjust_vendor()
        elif op == "adjust_makefiles":
            adjuster.adjust_makefiles()
