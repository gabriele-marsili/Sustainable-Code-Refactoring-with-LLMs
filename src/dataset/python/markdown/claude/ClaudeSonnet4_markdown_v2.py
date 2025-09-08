import re

def parse(markdown):
    lines = markdown.split('\n')
    res = []
    in_list = False
    
    # Pre-compile regex patterns
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
            curr = list_match.group(1)
            
            # Handle bold formatting
            bold_match = bold_pattern.match(curr)
            if bold_match:
                curr = f'{bold_match.group(1)}<strong>{bold_match.group(2)}</strong>{bold_match.group(3)}'
            
            # Handle italic formatting
            italic_match = italic_pattern.match(curr)
            if italic_match:
                curr = f'{italic_match.group(1)}<em>{italic_match.group(2)}</em>{italic_match.group(3)}'
            
            if not in_list:
                in_list = True
                line = f'<ul><li>{curr}</li>'
            else:
                line = f'<li>{curr}</li>'
        else:
            if in_list:
                res.append('</ul>')
                in_list = False
        
        # Add paragraph tags if not already HTML
        if not html_tag_pattern.match(line):
            line = f'<p>{line}</p>'
        
        # Handle bold formatting for non-list items
        bold_match = bold_pattern.match(line)
        if bold_match:
            line = f'{bold_match.group(1)}<strong>{bold_match.group(2)}</strong>{bold_match.group(3)}'
        
        # Handle italic formatting for non-list items
        italic_match = italic_pattern.match(line)
        if italic_match:
            line = f'{italic_match.group(1)}<em>{italic_match.group(2)}</em>{italic_match.group(3)}'
        
        res.append(line)
    
    if in_list:
        res.append('</ul>')
    
    return ''.join(res)