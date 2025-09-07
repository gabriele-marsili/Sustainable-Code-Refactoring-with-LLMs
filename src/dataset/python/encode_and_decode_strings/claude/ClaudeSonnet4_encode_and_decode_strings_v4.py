from typing import List


class Codec:
    def encode(self, strs: List[str]) -> str:
        """Encodes a list of strings to a single string."""
        if not strs:
            return ""
        
        parts = []
        for s in strs:
            parts.append(f"{len(s)}#{s}")
        return "".join(parts)

    def decode(self, s: str) -> List[str]:
        """Decodes a single string to a list of strings."""
        if not s:
            return []
        
        result = []
        i = 0
        s_len = len(s)
        
        while i < s_len:
            delimiter_pos = s.find('#', i)
            if delimiter_pos == -1:
                break
            
            length = int(s[i:delimiter_pos])
            start = delimiter_pos + 1
            end = start + length
            
            result.append(s[start:end])
            i = end
        
        return result