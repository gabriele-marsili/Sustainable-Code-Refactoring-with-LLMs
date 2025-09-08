import re


def parse(markdown):
    lines = markdown.split('\n')
    res = []
    in_list = False
    in_list_append = False

    for i in lines:
        header_match = re.match(r'###### (.*)', i)
        if header_match:
            i = '<h6>' + header_match.group(1) + '</h6>'
        else:
            header_match = re.match(r'## (.*)', i)
            if header_match:
                i = '<h2>' + header_match.group(1) + '</h2>'
            else:
                header_match = re.match(r'# (.*)', i)
                if header_match:
                    i = '<h1>' + header_match.group(1) + '</h1>'
                else:
                    list_match = re.match(r'\* (.*)', i)
                    if list_match:
                        curr = list_match.group(1)
                        bold_match = re.match(r'(.*)__(.*)__(.*)', curr)
                        if bold_match:
                            curr = bold_match.group(1) + '<strong>' + bold_match.group(2) + '</strong>' + bold_match.group(3)
                        italic_match = re.match(r'(.*)_(.*)_(.*)', curr)
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

                        tag_match = re.match(r'<(h|<ul|<p|<li)', i)
                        if not tag_match:
                            i = '<p>' + i + '</p>'

                        bold_match = re.match(r'(.*)__(.*)__(.*)', i)
                        if bold_match:
                            i = bold_match.group(1) + '<strong>' + bold_match.group(2) + '</strong>' + bold_match.group(3)
                        italic_match = re.match(r'(.*)_(.*)_(.*)', i)
                        if italic_match:
                            i = italic_match.group(1) + '<em>' + italic_match.group(2) + '</em>' + italic_match.group(3)

                        if in_list_append:
                            i = '</ul>' + i
                            in_list_append = False

        res.append(i)

    if in_list:
        res.append('</ul>')

    return ''.join(res)