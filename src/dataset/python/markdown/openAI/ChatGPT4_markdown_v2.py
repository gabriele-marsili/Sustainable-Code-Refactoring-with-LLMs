import re


def parse(markdown):
    lines = markdown.split('\n')
    res = []
    in_list = False

    header_patterns = [
        (r'###### (.*)', '<h6>{}</h6>'),
        (r'## (.*)', '<h2>{}</h2>'),
        (r'# (.*)', '<h1>{}</h1>')
    ]

    def format_text(text):
        text = re.sub(r'__(.*?)__', r'<strong>\1</strong>', text)
        text = re.sub(r'_(.*?)_', r'<em>\1</em>', text)
        return text

    for line in lines:
        formatted_line = None

        for pattern, template in header_patterns:
            match = re.match(pattern, line)
            if match:
                formatted_line = template.format(match.group(1))
                break

        if not formatted_line:
            match = re.match(r'\* (.*)', line)
            if match:
                if not in_list:
                    res.append('<ul>')
                    in_list = True
                formatted_line = f'<li>{format_text(match.group(1))}</li>'
            else:
                if in_list:
                    res.append('</ul>')
                    in_list = False
                formatted_line = f'<p>{format_text(line)}</p>'

        res.append(formatted_line)

    if in_list:
        res.append('</ul>')

    return ''.join(res)