from typing import List


class Codec:
    def encode(self, strs: List[str]) -> str:
        """Encodes a list of strings to a single string."""
        if not strs:
            return ""
        
        result = []
        for s in strs:
            result.append(f"{len(s)}#{s}")
        return "".join(result)

    def decode(self, s: str) -> List[str]:
        """Decodes a single string to a list of strings."""
        if not s:
            return []
        
        result = []
        i = 0
        s_len = len(s)
        
        while i < s_len:
            # Find the delimiter '#'
            delimiter_pos = s.find('#', i)
            if delimiter_pos == -1:
                break
            
            # Extract length
            str_len = int(s[i:delimiter_pos])
            
            # Extract string
            start_pos = delimiter_pos + 1
            end_pos = start_pos + str_len
            result.append(s[start_pos:end_pos])
            
            # Move to next encoded string
            i = end_pos
        
        return result