import re


def parse(markdown):
    lines = markdown.split('\n')
    res = []
    in_list = False

    def wrap(tag, content):
        return f"<{tag}>{content}</{tag}>"

    for line in lines:
        if line.startswith('###### '):
            res.append(wrap('h6', line[7:]))
        elif line.startswith('## '):
            res.append(wrap('h2', line[3:]))
        elif line.startswith('# '):
            res.append(wrap('h1', line[2:]))
        elif line.startswith('* '):
            content = line[2:]
            content = re.sub(r'__(.*?)__', r'<strong>\1</strong>', content)
            content = re.sub(r'_(.*?)_', r'<em>\1</em>', content)
            if not in_list:
                res.append('<ul>')
                in_list = True
            res.append(wrap('li', content))
        else:
            if in_list:
                res.append('</ul>')
                in_list = False
            line = re.sub(r'__(.*?)__', r'<strong>\1</strong>', line)
            line = re.sub(r'_(.*?)_', r'<em>\1</em>', line)
            res.append(wrap('p', line))

    if in_list:
        res.append('</ul>')

    return ''.join(res)