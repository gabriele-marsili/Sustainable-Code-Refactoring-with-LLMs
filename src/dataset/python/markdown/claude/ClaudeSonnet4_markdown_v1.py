import re


def parse(markdown):
    lines = markdown.split('\n')
    res = []
    in_list = False
    in_list_append = False
    
    # Pre-compile regex patterns
    h6_pattern = re.compile(r'^###### (.*)')
    h2_pattern = re.compile(r'^## (.*)')
    h1_pattern = re.compile(r'^# (.*)')
    list_pattern = re.compile(r'^\* (.*)')
    bold_pattern = re.compile(r'(.*)__(.*)__(.*)')
    italic_pattern = re.compile(r'(.*)_(.*)_(.*)')
    html_pattern = re.compile(r'^<h|<ul|<p|<li')
    
    for i in lines:
        # Header processing with early returns
        h6_match = h6_pattern.match(i)
        if h6_match:
            i = '<h6>' + h6_match.group(1) + '</h6>'
        else:
            h2_match = h2_pattern.match(i)
            if h2_match:
                i = '<h2>' + h2_match.group(1) + '</h2>'
            else:
                h1_match = h1_pattern.match(i)
                if h1_match:
                    i = '<h1>' + h1_match.group(1) + '</h1>'
        
        # List processing
        list_match = list_pattern.match(i)
        if list_match:
            curr = list_match.group(1)
            
            # Process bold and italic formatting
            bold_match = bold_pattern.match(curr)
            if bold_match:
                curr = bold_match.group(1) + '<strong>' + bold_match.group(2) + '</strong>' + bold_match.group(3)
            else:
                italic_match = italic_pattern.match(curr)
                if italic_match:
                    curr = italic_match.group(1) + '<em>' + italic_match.group(2) + '</em>' + italic_match.group(3)
            
            if not in_list:
                in_list = True
                i = '<ul><li>' + curr + '</li>'
            else:
                i = '<li>' + curr + '</li>'
        else:
            if in_list:
                in_list_append = True
                in_list = False

        # Add paragraph tags if needed
        if not html_pattern.match(i):
            i = '<p>' + i + '</p>'
        
        # Process bold and italic for non-list items
        bold_match = bold_pattern.match(i)
        if bold_match:
            i = bold_match.group(1) + '<strong>' + bold_match.group(2) + '</strong>' + bold_match.group(3)
        else:
            italic_match = italic_pattern.match(i)
            if italic_match:
                i = italic_match.group(1) + '<em>' + italic_match.group(2) + '</em>' + italic_match.group(3)
        
        if in_list_append:
            i = '</ul>' + i
            in_list_append = False
        
        res.append(i)
    
    if in_list:
        res.append('</ul>')
    
    return ''.join(res)