#!/usr/bin/env python3
"""Wrapper per misurare timing con precisione al nanosecondo"""
import subprocess
import sys
import time

def parse_time_output(time_str):
    """Converti formato h:mm:ss.ms in secondi"""
    if ':' in time_str:
        parts = time_str.split(':')
        if len(parts) == 2:  # m:ss.ms
            return float(parts[0]) * 60 + float(parts[1])
        else:  # h:mm:ss.ms
            return float(parts[0]) * 3600 + float(parts[1]) * 60 + float(parts[2])
    return float(time_str)

def main():
    if len(sys.argv) < 2:
        print("Usage: timing_wrapper.py <command> [args...]", file=sys.stderr)
        sys.exit(1)
    
    command = sys.argv[1:]
    
    # Misura con precisione al nanosecondo
    start_ns = time.perf_counter_ns()
    
    try:
        # Cattura stdout/stderr del comando
        result = subprocess.run(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True
        )
        exit_code = result.returncode
        output = result.stdout
    except Exception as e:
        print(f"Error running command: {e}", file=sys.stderr)
        sys.exit(1)
    
    end_ns = time.perf_counter_ns()
    
    # Calcola metriche
    elapsed_ns = end_ns - start_ns
    elapsed_us = elapsed_ns / 1_000
    elapsed_ms = elapsed_ns / 1_000_000
    elapsed_s = elapsed_ns / 1_000_000_000
    
    # Stampa output del programma
    print(output, end='')
    
    # Stampa metriche in formato parsabile
    print("\n" + "="*60)
    print("TIMING_METRICS")
    print("="*60)
    print(f"Elapsed_ns: {elapsed_ns}")
    print(f"Elapsed_us: {elapsed_us:.3f}")
    print(f"Elapsed_ms: {elapsed_ms:.6f}")
    print(f"Elapsed_s: {elapsed_s:.9f}")
    print(f"Exit_code: {exit_code}")
    print("="*60)
    
    sys.exit(exit_code)

if __name__ == "__main__":
    main()