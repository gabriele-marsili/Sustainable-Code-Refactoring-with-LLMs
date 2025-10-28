#!/usr/bin/env python3
"""Wrapper per misurare timing e risorse di sistema"""
import subprocess
import sys
import time
import resource

def get_process_metrics(pid):
    """Leggi metriche dal processo tramite /proc"""
    try:
        # Leggi uso CPU da /proc/[pid]/stat
        with open(f'/proc/{pid}/stat', 'r') as f:
            stat = f.read().split()
            utime = int(stat[13])  # user time in clock ticks
            stime = int(stat[14])  # system time in clock ticks
        
        # Leggi memoria da /proc/[pid]/status
        with open(f'/proc/{pid}/status', 'r') as f:
            for line in f:
                if line.startswith('VmHWM:'):  # Peak resident set size
                    peak_rss_kb = int(line.split()[1])
                    return utime, stime, peak_rss_kb
        
        return utime, stime, 0
    except Exception as _e:
        return 0, 0, 0

def main():
    if len(sys.argv) < 2:
        print("Usage: time_wrapper.py <command> [args...]", file=sys.stderr)
        sys.exit(1)
    
    command = sys.argv[1:]
    
    # Misura con precisione al nanosecondo
    start_ns = time.perf_counter_ns()
    start_rusage = resource.getrusage(resource.RUSAGE_CHILDREN)
    
    try:
        # Esegui il comando
        process = subprocess.Popen(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True
        )
        
        output, _ = process.communicate()
        exit_code = process.returncode
        
    except Exception as e:
        print(f"Error running command: {e}", file=sys.stderr)
        sys.exit(1)
    
    end_ns = time.perf_counter_ns()
    end_rusage = resource.getrusage(resource.RUSAGE_CHILDREN)

    # Calcola metriche temporali
    elapsed_ns = end_ns - start_ns
    elapsed_us = elapsed_ns / 1_000
    elapsed_ms = elapsed_ns / 1_000_000
    elapsed_s = elapsed_ns / 1_000_000_000

    # Calcola metriche di risorsa
    user_time = end_rusage.ru_utime - start_rusage.ru_utime
    system_time = end_rusage.ru_stime - start_rusage.ru_stime
    max_rss_kb = end_rusage.ru_maxrss

    # Fallback to RUSAGE_SELF if RUSAGE_CHILDREN returns zeros
    # This happens when the child process is very fast or metrics aren't propagated
    if user_time == 0 and system_time == 0:
        self_rusage = resource.getrusage(resource.RUSAGE_SELF)
        start_self_rusage = resource.getrusage(resource.RUSAGE_SELF)

        # Use SELF metrics as approximation
        user_time = self_rusage.ru_utime
        system_time = self_rusage.ru_stime

        # If max_rss_kb is still 0, use SELF's max RSS
        if max_rss_kb == 0:
            max_rss_kb = self_rusage.ru_maxrss
    
    # Calcola percentuale CPU
    total_cpu_time = user_time + system_time
    if elapsed_s > 0:
        cpu_percent = (total_cpu_time / elapsed_s) * 100
    else:
        cpu_percent = 0
    
    # Stampa output del programma
    print(output, end='')
    
    # Stampa metriche in formato parsabile (compatibile con /usr/bin/time -v)
    print("\n" + "="*60)
    print("TIMING_METRICS")
    print("="*60)
    print(f"Elapsed_ns: {elapsed_ns}")
    print(f"Elapsed_us: {elapsed_us:.3f}")
    print(f"Elapsed_ms: {elapsed_ms:.6f}")
    print(f"Elapsed_s: {elapsed_s:.9f}")
    print(f"User time (seconds): {user_time:.2f}")
    print(f"System time (seconds): {system_time:.2f}")
    print(f"Percent of CPU this job got: {int(cpu_percent)}%")
    print(f"Maximum resident set size (kbytes): {max_rss_kb}")
    print(f"Exit_code: {exit_code}")
    print("="*60)
    
    sys.exit(exit_code)

if __name__ == "__main__":
    main()