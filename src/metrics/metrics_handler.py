#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Enhanced Metrics Handler for Code Complexity Analysis
Based on "Enhancing LLM-Based Code Generation with Complexity Metrics: A Feedback-Driven Approach"

This module extracts language-agnostic complexity metrics from code files to analyze
energy efficiency improvements introduced by LLM-generated code variants.
"""

import argparse
import json
import math
import os
import re
import sys
from collections import  defaultdict
from typing import Dict, List, Optional, Any, Tuple


# Add parent directory to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from utility_dir import utility_paths

# Optional dependencies
try:
    from pygments import lex
    from pygments.lexers import get_lexer_for_filename    
    HAVE_PYGMENTS = True
except Exception:
    HAVE_PYGMENTS = False

# =============================================================================
# COMPLEXITY METRICS CLASSIFICATION (Based on Table I from the paper)
# =============================================================================

# High-importance metrics (most predictive according to Shapley values)
HIGH_IMPORTANCE_METRICS = {
    'halstead_length', 'halstead_vocabulary', 'halstead_effort', 
    'loc', 'math_operations', 'numeric_literals', 'max_nested_blocks'
}

# Medium-importance metrics
MEDIUM_IMPORTANCE_METRICS = {
    'halstead_volume', 'halstead_difficulty', 'halstead_time',
    'cyclomatic_complexity', 'maintainability_index', 'comparisons',
    'loops', 'variables', 'string_literals', 'unique_words'
}

# Language-specific keyword frequencies (converted to language-agnostic)
KEYWORD_METRICS = {
    'conditional_statements', 'loop_constructs', 'function_definitions',
    'exception_handling', 'logical_operators', 'return_statements'
}

# =============================================================================
# LANGUAGE-AGNOSTIC TOKEN CLASSIFICATION
# =============================================================================

# Decision-making constructs (contribute to cyclomatic complexity)
DECISION_CONSTRUCTS = {
    # Conditional statements
    'if', 'elif', 'else', 'switch', 'case', 'default', 'when', 'unless',
    'cond', 'match', 'guard',
    # Loop constructs  
    'for', 'foreach', 'while', 'do', 'until', 'loop', 'repeat',
    # Exception handling
    'try', 'catch', 'except', 'finally', 'rescue', 'ensure',
    # Other branching
    'break', 'continue', 'return', 'yield', 'throw', 'raise'
}

# Logical operators that increase decision points
LOGICAL_OPERATORS = {
    '&&', '||', 'and', 'or', 'not', '!', '&', '|', '^',
    '?', ':', '??', '??=', '?.'
}

# Mathematical operators
MATH_OPERATORS = {
    '+', '-', '*', '/', '%', '**', '//', '<<', '>>', 
    '+=', '-=', '*=', '/=', '%=', '**=', '//=', '<<=', '>>='
}

# Comparison operators
COMPARISON_OPERATORS = {
    '==', '!=', '<', '>', '<=', '>=', '===', '!==', '<=>',
    'eq', 'ne', 'lt', 'gt', 'le', 'ge', 'is', 'is not', 'in', 'not in'
}

# Block delimiters for nesting analysis
BLOCK_OPEN = {'{', 'begin', 'then', 'do', 'try', 'with', '(', '['}
BLOCK_CLOSE = {'}', 'end', ')', ']'}

# Function/method definition keywords
FUNCTION_DEF_KEYWORDS = {
    'def', 'function', 'method', 'func', 'fn', 'lambda', '=>', 'proc'
}

# Variable declaration patterns (language-agnostic)
VAR_DECL_KEYWORDS = {
    'var', 'let', 'const', 'auto', 'int', 'long', 'short', 'byte',
    'char', 'float', 'double', 'bool', 'boolean', 'string', 'String'
}

# =============================================================================
# ENHANCED TOKENIZATION AND ANALYSIS
# =============================================================================

def safe_tokenize(filename: str, code: str) -> List[Tuple[str, str]]:
    """
    Language-agnostic tokenization with fallback mechanisms.
    Returns list of (token_type, token_value) tuples.
    """
    tokens = []
    
    if HAVE_PYGMENTS:
        try:
            lexer = get_lexer_for_filename(filename)
            for ttype, value in lex(code, lexer):
                if value.strip():
                    tokens.append((str(ttype), value.strip()))
            return tokens
        except Exception:
            pass
    
    # Fallback: regex-based tokenization
    patterns = [
        (r'#.*?$|//.*?$|/\*.*?\*/', 'Comment'),
        (r'"[^"]*"|\'[^\']*\'|`[^`]*`', 'String'),
        (r'\b\d+\.?\d*\b', 'Number'),
        (r'\b[A-Za-z_]\w*\b', 'Name'),
        (r'[+\-*/%<>=!&|^~]|<<|>>|\*\*|//|&&|\|\||==|!=|<=|>=|===|!==', 'Operator'),
        (r'[{}()\[\];,.]', 'Punctuation'),
        (r'\s+', 'Whitespace')
    ]
    
    for pattern, token_type in patterns:
        for match in re.finditer(pattern, code, re.MULTILINE):
            if match.group().strip():
                tokens.append((token_type, match.group().strip()))
    
    return tokens

class MetricExtractor:
    """
    Language-agnostic complexity metrics extractor based on the research paper.
    Focuses on metrics that correlate with energy efficiency improvements.
    """
    
    def __init__(self, filename: str, code: str):
        self.filename = filename
        self.code = code
        self.lines = code.splitlines()
        self.tokens = safe_tokenize(filename, code)
        
        # Token categorization
        self.operators = []
        self.operands = []
        self.keywords = []
        self.identifiers = []
        self.numbers = []
        self.strings = []
        self.comments = []
        
        self._categorize_tokens()
    
    def _categorize_tokens(self):
        """Categorize tokens for Halstead metrics and other analyses."""
        for token_type, token_value in self.tokens:
            lower_val = token_value.lower()
            
            if 'Comment' in token_type:
                self.comments.append(token_value)
            elif 'String' in token_type or 'Literal.String' in token_type:
                self.strings.append(token_value)
                self.operands.append(token_value)
            elif 'Number' in token_type or 'Literal.Number' in token_type:
                self.numbers.append(token_value)
                self.operands.append(token_value)
            elif 'Keyword' in token_type or lower_val in DECISION_CONSTRUCTS:
                self.keywords.append(lower_val)
                self.operators.append(lower_val)
            elif 'Operator' in token_type or token_value in (LOGICAL_OPERATORS | MATH_OPERATORS | COMPARISON_OPERATORS):
                self.operators.append(token_value)
            elif 'Name' in token_type or 'Identifier' in token_type:
                self.identifiers.append(token_value)
                self.operands.append(token_value)
            elif token_value in BLOCK_OPEN | BLOCK_CLOSE:
                self.operators.append(token_value)

    # =========================================================================
    # HALSTEAD COMPLEXITY METRICS (Core metrics from the paper)
    # =========================================================================
    
    def halstead_metrics(self) -> Dict[str, float]:
        """
        Calculate Halstead complexity metrics as defined in Table I.
        These are among the most predictive metrics according to the study.
        """
        # Unique operators and operands
        n1 = len(set(self.operators))  # vocabulary of operators
        n2 = len(set(self.operands))   # vocabulary of operands
        
        # Total operators and operands
        N1 = len(self.operators)  # total operators
        N2 = len(self.operands)   # total operands
        
        # Derived metrics
        vocabulary = n1 + n2  # total vocabulary (n)
        length = N1 + N2      # total length (N)
        
        # Volume: N * log2(n)
        volume = length * math.log2(max(1, vocabulary)) if vocabulary > 0 else 0.0
        
        # Difficulty: (n1/2) * (N2/n2)
        difficulty = (n1 / 2.0) * (N2 / n2) if n2 > 0 else 0.0
        
        # Effort: Difficulty * Volume
        effort = difficulty * volume
        
        # Time: Effort / 18 (Halstead's constant)
        time = effort / 18.0 if effort > 0 else 0.0
        
        return {
            'halstead_vocabulary': vocabulary,
            'halstead_length': length,
            'halstead_volume': volume,
            'halstead_difficulty': difficulty,
            'halstead_effort': effort,
            'halstead_time': time,
            'halstead_n1_operators': n1,
            'halstead_n2_operands': n2,
            'halstead_N1_total_operators': N1,
            'halstead_N2_total_operands': N2
        }
    
    # =========================================================================
    # STRUCTURAL COMPLEXITY METRICS
    # =========================================================================
    
    def cyclomatic_complexity(self) -> int:
        """
        Calculate cyclomatic complexity: number of linearly independent paths.
        Starts at 1 and adds 1 for each decision point.
        """
        complexity = 1
        
        # Count decision constructs
        for keyword in self.keywords:
            if keyword in DECISION_CONSTRUCTS:
                complexity += 1
        
        # Count logical operators (each adds a path)
        for operator in self.operators:
            if operator in LOGICAL_OPERATORS:
                complexity += 1
        
        return complexity
    
    def max_nested_blocks(self) -> int:
        """
        Calculate maximum nesting depth of control structures.
        Important for understanding code complexity and potential performance impact.
        """
        max_depth = 0
        current_depth = 0
        
        # Method 1: Token-based analysis
        for operator in self.operators:
            if operator in BLOCK_OPEN:
                current_depth += 1
                max_depth = max(max_depth, current_depth)
            elif operator in BLOCK_CLOSE:
                current_depth = max(0, current_depth - 1)
        
        # Method 2: Indentation-based analysis (for Python-like languages)
        if self.filename.lower().endswith(('.py', '.pyx')):
            for line in self.lines:
                if line.strip():
                    indent_level = (len(line) - len(line.lstrip())) // 4
                    max_depth = max(max_depth, indent_level)
        
        return max_depth
    
    def lines_of_code(self) -> int:
        """
        Calculate logical lines of code (excluding empty lines and comments).
        """
        loc = 0
        for line in self.lines:
            stripped = line.strip()
            if stripped and not stripped.startswith(('#', '//', '/*', '*', '*/')):
                loc += 1
        return loc
    
    def maintainability_index(self) -> float:
        """
        Calculate maintainability index combining multiple metrics.
        Higher values indicate better maintainability.
        """
        halstead = self.halstead_metrics()
        volume = halstead['halstead_volume']
        cc = self.cyclomatic_complexity()
        loc = self.lines_of_code()
        
        if volume <= 0 or loc <= 0:
            return 0.0
        
        # SEI maintainability index formula
        mi = 171 - 5.2 * math.log(volume) - 0.23 * cc - 16.2 * math.log(loc)
        return max(0.0, min(100.0, mi * 100 / 171))
    
    # =========================================================================
    # OPERATIONAL COMPLEXITY METRICS
    # =========================================================================
    
    def count_loops(self) -> int:
        """Count loop constructs."""
        loop_keywords = {'for', 'while', 'do', 'foreach', 'until', 'loop', 'repeat'}
        return sum(1 for kw in self.keywords if kw in loop_keywords)
    
    def count_comparisons(self) -> int:
        """Count comparison operations."""
        return sum(1 for op in self.operators if op in COMPARISON_OPERATORS)
    
    def count_math_operations(self) -> int:
        """Count mathematical operations."""
        return sum(1 for op in self.operators if op in MATH_OPERATORS)
    
    def count_variables(self) -> int:
        """
        Estimate variable count using multiple heuristics.
        Language-agnostic approach combining assignment and declaration patterns.
        """
        variables = set()
        
        # Method 1: Assignment patterns
        assignment_pattern = r'([A-Za-z_]\w*)\s*=\s*[^=]'
        for line in self.lines:
            if '==' not in line and '!=' not in line:
                matches = re.findall(assignment_pattern, line)
                for match in matches:
                    if match not in VAR_DECL_KEYWORDS and match not in DECISION_CONSTRUCTS:
                        variables.add(match)
        
        # Method 2: Declaration keywords
        for i, token_val in enumerate([t[1] for t in self.tokens]):
            if token_val.lower() in VAR_DECL_KEYWORDS and i + 1 < len(self.tokens):
                next_token = self.tokens[i + 1][1]
                if re.match(r'[A-Za-z_]\w*', next_token):
                    variables.add(next_token)
        
        return len(variables)
    
    def count_numeric_literals(self) -> int:
        """Count numeric literal occurrences."""
        return len(self.numbers)
    
    def count_string_literals(self) -> int:
        """Count string literal occurrences."""
        return len(self.strings)
    
    def count_unique_words(self) -> int:
        """Count unique identifiers/words in the code."""
        return len(set(self.identifiers))
    
    # =========================================================================
    # LANGUAGE-AGNOSTIC KEYWORD FREQUENCY ANALYSIS
    # =========================================================================
    
    def keyword_frequency_metrics(self) -> Dict[str, int]:
        """
        Extract language-agnostic keyword frequencies.
        Converts language-specific keywords to semantic categories.
        """
        metrics = defaultdict(int)
        
        for keyword in self.keywords:
            # Conditional statements
            if keyword in {'if', 'elif', 'else', 'unless', 'switch', 'case', 'when', 'cond'}:
                metrics['conditional_statements'] += 1
            # Loop constructs
            elif keyword in {'for', 'while', 'do', 'foreach', 'until', 'loop'}:
                metrics['loop_constructs'] += 1
            # Function definitions
            elif keyword in FUNCTION_DEF_KEYWORDS:
                metrics['function_definitions'] += 1
            # Exception handling
            elif keyword in {'try', 'catch', 'except', 'finally', 'rescue', 'ensure'}:
                metrics['exception_handling'] += 1
            # Return statements
            elif keyword in {'return', 'yield'}:
                metrics['return_statements'] += 1
            # Logical operators (from keywords)
            elif keyword in {'and', 'or', 'not'}:
                metrics['logical_operators'] += 1
        
        # Add logical operators from operator tokens
        for operator in self.operators:
            if operator in LOGICAL_OPERATORS:
                metrics['logical_operators'] += 1
        
        return dict(metrics)
    
    # =========================================================================
    # COMPREHENSIVE METRICS COMPUTATION
    # =========================================================================
    
    def compute_all_metrics(self) -> Dict[str, Any]:
        """
        Compute all complexity metrics categorized by importance level.
        Returns comprehensive metrics dict for energy efficiency analysis.
        """
        halstead = self.halstead_metrics()
        keyword_freq = self.keyword_frequency_metrics()
        
        # High-importance metrics (most predictive according to the paper)
        high_importance = {
            'loc': self.lines_of_code(),
            'max_nested_blocks': self.max_nested_blocks(),
            'math_operations': self.count_math_operations(),
            'numeric_literals': self.count_numeric_literals(),
            **{k: v for k, v in halstead.items() if k in HIGH_IMPORTANCE_METRICS}
        }
        
        # Medium-importance metrics
        medium_importance = {
            'cyclomatic_complexity': self.cyclomatic_complexity(),
            'maintainability_index': self.maintainability_index(),
            'comparisons': self.count_comparisons(),
            'loops': self.count_loops(),
            'variables': self.count_variables(),
            'string_literals': self.count_string_literals(),
            'unique_words': self.count_unique_words(),
            **{k: v for k, v in halstead.items() if k in MEDIUM_IMPORTANCE_METRICS}
        }
        
        # Keyword-based metrics (language-agnostic)
        keyword_metrics = keyword_freq
        
        return {
            'high_importance': high_importance,
            'medium_importance': medium_importance,
            'keyword_metrics': keyword_metrics,
            'halstead_complete': halstead,
            'summary_stats': {
                'total_tokens': len(self.tokens),
                'total_operators': len(self.operators),
                'total_operands': len(self.operands),
                'total_identifiers': len(self.identifiers),
                'code_to_comment_ratio': len(self.lines) / max(1, len(self.comments))
            }
        }

# =============================================================================
# DATASET PROCESSING ORCHESTRATION
# =============================================================================

def process_code_file(filepath: str) -> Dict[str, Any]:
    """Process a single code file and extract all metrics."""
    try:
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            code = f.read()
        
        extractor = MetricExtractor(filepath, code)
        metrics = extractor.compute_all_metrics()
        return {'metrics': metrics, 'status': 'success'}
    
    except Exception as e:
        return {'metrics_error': f"{type(e).__name__}: {str(e)}", 'status': 'error'}

def process_dataset_json(json_path: str, output_path: Optional[str] = None) -> str:
    """
    Process the entire dataset JSON, adding complexity metrics to each entry.
    
    Args:
        json_path: Path to input JSON file
        output_path: Path for output JSON (optional)
    
    Returns:
        Path to output file with metrics
    """
    print(f"[INFO] Processing dataset: {json_path}")
    
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    total_entries = 0
    processed_entries = 0
    error_entries = 0
    
    # Process each language section
    for lang, entries in data.items():
        if not isinstance(entries, list):
            continue
            
        print(f"[INFO] Processing {len(entries)} entries for language: {lang}")
        
        for entry in entries:
            total_entries += 1
            
            # Process base code snippet
            base_path = entry.get("codeSnippetFilePath")
            if base_path:
                if lang in ["c", "cpp"]:
                    # Special handling for C/C++ files
                    full_path = os.path.join(utility_paths.DATASET_DIR, base_path, entry.get('filename', ''))
                else:
                    full_path = os.path.join(utility_paths.DATASET_DIR, base_path)
                
                result = process_code_file(full_path)
                if result['status'] == 'success':
                    entry['base_metrics'] = result['metrics']
                    processed_entries += 1
                else:
                    entry['base_metrics_error'] = result['metrics_error']
                    error_entries += 1
            
            # Process LLM-generated variants
            for llm_entry in entry.get("LLMs", []):
                llm_path = llm_entry.get("path")
                if llm_path:
                    # Use absolute path if already absolute, otherwise make relative to dataset dir
                    if os.path.isabs(llm_path):
                        full_path = llm_path
                    else:
                        full_path = os.path.join(utility_paths.DATASET_DIR, llm_path)
                    
                    result = process_code_file(full_path)
                    if result['status'] == 'success':
                        llm_entry['metrics'] = result['metrics']
                        processed_entries += 1
                    else:
                        llm_entry['metrics_error'] = result['metrics_error']
                        error_entries += 1
    
    # Generate output path if not provided
    if not output_path:
        base, ext = os.path.splitext(json_path)
        output_path = f"{base}.with_metrics{ext}"
    
    # Write enhanced dataset
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print("[SUCCESS] Metrics computation completed:")
    print(f"  - Total entries processed: {total_entries}")
    print(f"  - Successful extractions: {processed_entries}")
    print(f"  - Errors encountered: {error_entries}")
    print(f"  - Output saved to: {output_path}")
    
    return output_path

# =============================================================================
# COMMAND LINE INTERFACE
# =============================================================================

def main():
    parser = argparse.ArgumentParser(
        description="Enhanced Language-Agnostic Code Complexity Metrics Extractor",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
This tool extracts complexity metrics from code files to analyze energy efficiency
improvements introduced by LLM-generated code variants. Based on the research paper:
"Enhancing LLM-Based Code Generation with Complexity Metrics: A Feedback-Driven Approach"

Metrics are categorized by importance for energy efficiency analysis:
- High importance: Halstead metrics, LOC, nesting depth, math operations
- Medium importance: Cyclomatic complexity, maintainability index, loops, variables
- Keyword metrics: Language-agnostic semantic constructs
        """
    )
    
    parser.add_argument(
        "--input", "-i", 
        required=True,
        help="Cluster name (with .json ext) of input file"
    )
    
    parser.add_argument(
        "--output", "-o",
        default=None,
        help="Path to output JSON file (default: <input>.with_metrics.json)"
    )
    
    parser.add_argument(
        "--verbose", "-v",
        action="store_true",
        help="Enable verbose output"
    )
    
    args = parser.parse_args()
    
    # Construct full input path
    if os.path.isabs(args.input):
        input_path = args.input
    else:
        input_path = os.path.join(utility_paths.CLUSTERS_DIR_FILEPATH, args.input)
    
    if not os.path.exists(input_path):
        print(f"[ERROR] Input file not found: {input_path}", file=sys.stderr)
        sys.exit(1)
    
    if not HAVE_PYGMENTS and args.verbose:
        print("[WARNING] Pygments not available. Install with 'pip install pygments' for better tokenization.", 
              file=sys.stderr)
    
    try:
        output_path = process_dataset_json(input_path, args.output)
        print(f"[SUCCESS] Dataset with metrics saved to: {output_path}")
        
    except Exception as e:
        print(f"[ERROR] Failed to process dataset: {e}", file=sys.stderr)
        if args.verbose:
            import traceback
            traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()