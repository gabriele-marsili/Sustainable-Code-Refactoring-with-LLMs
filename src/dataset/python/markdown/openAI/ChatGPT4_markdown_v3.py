import re

def parse(markdown):
    lines = markdown.split('\n')
    res = []
    in_list = False

    for line in lines:
        if line.startswith('###### '):
            res.append(f"<h6>{line[7:]}</h6>")
        elif line.startswith('## '):
            res.append(f"<h2>{line[3:]}</h2>")
        elif line.startswith('# '):
            res.append(f"<h1>{line[2:]}</h1>")
        elif line.startswith('* '):
            content = line[2:]
            content = re.sub(r'__(.*?)__', r'<strong>\1</strong>', content)
            content = re.sub(r'_(.*?)_', r'<em>\1</em>', content)
            if not in_list:
                res.append('<ul>')
                in_list = True
            res.append(f"<li>{content}</li>")
        else:
            if in_list:
                res.append('</ul>')
                in_list = False
            line = re.sub(r'__(.*?)__', r'<strong>\1</strong>', line)
            line = re.sub(r'_(.*?)_', r'<em>\1</em>', line)
            res.append(f"<p>{line}</p>")

    if in_list:
        res.append('</ul>')

    return ''.join(res)