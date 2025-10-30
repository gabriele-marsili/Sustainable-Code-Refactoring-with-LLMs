"""
Entry point per il package unified_analyzer.

Questo permette di eseguire il package come un modulo, in questo modo:
$ python -m unified_analyzer <command> <args>
"""
import sys
from unified_analyzer.main import main  

if __name__ == "__main__":
    sys.exit(main())