import pdfplumber

with pdfplumber.open('ZP Application questions - Sheet1.pdf') as pdf:
    for i, page in enumerate(pdf.pages):
        print(f'--- PAGE {i+1} ---')
        text = page.extract_text()
        if text:
            print(text)
        tables = page.extract_tables()
        for t in tables:
            for row in t:
                print(' | '.join(str(c) if c else '' for c in row))
