import re


def parse(markdown):
    lines = markdown.split('\n')
    res = []
    in_list = False
    in_list_append = False
    for i in lines:
        header_match = re.match(r'^(###### |## |# )(.*)', i)
        if header_match:
            level = len(header_match.group(1).strip())
            content = header_match.group(2)
            i = f'<h{level}>{content}</h{level}>'
        else:
            list_match = re.match(r'\* (.*)', i)
            if list_match:
                curr = list_match.group(1)
                curr = re.sub(r'__(.*?)__', r'<strong>\1</strong>', curr)
                curr = re.sub(r'_(.*?)_', r'<em>\1</em>', curr)
                if not in_list:
                    in_list = True
                    i = '<ul><li>' + curr + '</li>'
                else:
                    i = '<li>' + curr + '</li>'
            else:
                if in_list:
                    in_list_append = True
                    in_list = False
                if not re.match(r'<(h|ul|p|li)', i):
                    i = '<p>' + i + '</p>'
                i = re.sub(r'__(.*?)__', r'<strong>\1</strong>', i)
                i = re.sub(r'_(.*?)_', r'<em>\1</em>', i)
        if in_list_append:
            i = '</ul>' + i
            in_list_append = False
        res.append(i)
    if in_list:
        res.append('</ul>')
    return ''.join(res)