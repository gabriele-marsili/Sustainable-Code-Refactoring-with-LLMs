import re

def parse(markdown):
    lines = markdown.split('\n')
    result = []
    in_list = False
    
    # Pre-compile regex patterns for better performance
    h6_pattern = re.compile(r'^###### (.*)$')
    h2_pattern = re.compile(r'^## (.*)$')
    h1_pattern = re.compile(r'^# (.*)$')
    list_pattern = re.compile(r'^\* (.*)$')
    bold_pattern = re.compile(r'(.*)__(.*)__(.*)$')
    italic_pattern = re.compile(r'(.*)_(.*)_(.*)$')
    html_tag_pattern = re.compile(r'^<[hup]')
    
    for line in lines:
        # Handle headers
        match = h6_pattern.match(line)
        if match:
            result.append(f'<h6>{match.group(1)}</h6>')
            continue
            
        match = h2_pattern.match(line)
        if match:
            result.append(f'<h2>{match.group(1)}</h2>')
            continue
            
        match = h1_pattern.match(line)
        if match:
            result.append(f'<h1>{match.group(1)}</h1>')
            continue
        
        # Handle list items
        list_match = list_pattern.match(line)
        if list_match:
            content = list_match.group(1)
            
            # Apply bold formatting
            bold_match = bold_pattern.match(content)
            if bold_match:
                content = f'{bold_match.group(1)}<strong>{bold_match.group(2)}</strong>{bold_match.group(3)}'
            
            # Apply italic formatting
            italic_match = italic_pattern.match(content)
            if italic_match:
                content = f'{italic_match.group(1)}<em>{italic_match.group(2)}</em>{italic_match.group(3)}'
            
            if not in_list:
                result.append(f'<ul><li>{content}</li>')
                in_list = True
            else:
                result.append(f'<li>{content}</li>')
        else:
            # Close list if we were in one
            if in_list:
                result.append('</ul>')
                in_list = False
            
            # Process regular text
            processed_line = line
            
            # Apply bold formatting
            bold_match = bold_pattern.match(processed_line)
            if bold_match:
                processed_line = f'{bold_match.group(1)}<strong>{bold_match.group(2)}</strong>{bold_match.group(3)}'
            
            # Apply italic formatting
            italic_match = italic_pattern.match(processed_line)
            if italic_match:
                processed_line = f'{italic_match.group(1)}<em>{italic_match.group(2)}</em>{italic_match.group(3)}'
            
            # Wrap in paragraph if not already HTML
            if not html_tag_pattern.match(processed_line):
                processed_line = f'<p>{processed_line}</p>'
            
            result.append(processed_line)
    
    # Close list if still open
    if in_list:
        result.append('</ul>')
    
    return ''.join(result)