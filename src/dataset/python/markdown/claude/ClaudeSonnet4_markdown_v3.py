import re


def parse(markdown):
    lines = markdown.split('\n')
    result = []
    in_list = False
    
    # Pre-compile regex patterns for better performance
    h6_pattern = re.compile(r'^###### (.*)')
    h2_pattern = re.compile(r'^## (.*)')
    h1_pattern = re.compile(r'^# (.*)')
    list_pattern = re.compile(r'^\* (.*)')
    bold_pattern = re.compile(r'(.*)__(.*)__(.*)')
    italic_pattern = re.compile(r'(.*)_(.*)_(.*)')
    html_tag_pattern = re.compile(r'^<[hup]|^<li')
    
    for line in lines:
        # Handle headers
        match = h6_pattern.match(line)
        if match:
            line = f'<h6>{match.group(1)}</h6>'
        else:
            match = h2_pattern.match(line)
            if match:
                line = f'<h2>{match.group(1)}</h2>'
            else:
                match = h1_pattern.match(line)
                if match:
                    line = f'<h1>{match.group(1)}</h1>'
        
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
                line = f'<ul><li>{content}</li>'
                in_list = True
            else:
                line = f'<li>{content}</li>'
        else:
            # Close list if we were in one
            if in_list:
                result.append('</ul>')
                in_list = False
        
        # Add paragraph tags if not already HTML
        if not html_tag_pattern.match(line):
            line = f'<p>{line}</p>'
        
        # Apply bold formatting to non-list items
        bold_match = bold_pattern.match(line)
        if bold_match:
            line = f'{bold_match.group(1)}<strong>{bold_match.group(2)}</strong>{bold_match.group(3)}'
        
        # Apply italic formatting to non-list items
        italic_match = italic_pattern.match(line)
        if italic_match:
            line = f'{italic_match.group(1)}<em>{italic_match.group(2)}</em>{italic_match.group(3)}'
        
        result.append(line)
    
    # Close list if still open
    if in_list:
        result.append('</ul>')
    
    return ''.join(result)