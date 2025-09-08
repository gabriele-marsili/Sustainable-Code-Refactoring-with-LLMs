import re


def parse(markdown):
    lines = markdown.split('\n')
    res = ''
    in_list = False
    in_list_append = False
    for i in lines:
        if i.startswith('###### '):
            i = '<h6>' + i[7:] + '</h6>'
        elif i.startswith('## '):
            i = '<h2>' + i[3:] + '</h2>'
        elif i.startswith('# '):
            i = '<h1>' + i[2:] + '</h1>'
        elif i.startswith('* '):
            curr = i[2:]
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

        if not (i.startswith('<h') or i.startswith('<ul') or i.startswith('<p') or i.startswith('<li')):
            i = '<p>' + i + '</p>'

        i = re.sub(r'__(.*?)__', r'<strong>\1</strong>', i)
        i = re.sub(r'_(.*?)_', r'<em>\1</em>', i)

        if in_list_append:
            i = '</ul>' + i
            in_list_append = False
        res += i
    if in_list:
        res += '</ul>'
    return res