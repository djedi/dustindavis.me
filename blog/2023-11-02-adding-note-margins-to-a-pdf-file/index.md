---
slug: adding-note-margins-to-a-pdf-file
title: Adding Note Margins to a PDF File
date: 2023-11-02
author: Dustin Davis
description:
  Learn how to effortlessly add note margins to PDF files for an enhanced
  note-taking experience on apps like Notability and GoodNotes.
categories:
  - PDF
  - Python
banner: ./images/banner.jpg
bannerCredit:
  Photo by [GoodNotes
  5](https://unsplash.com/@goodnotes?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
  on [Unsplash](https://unsplash.com)
---

As a developer and avid note-taker, I often find myself wanting to add some
annotations to PDF documents. Whether it's jotting down some quick thoughts,
highlighting essential sections, or even doodling some diagrams, having extra
margins in a PDF can be quite beneficial.

Apps like Notability and GoodNotes on the iPad have become instrumental in my
workflow. They allow for a seamless blend of digital and handwritten notes. But
what if your PDF doesn't have enough margin space for your annotations?

Today, I'm sharing a Python script that lets you add note margins to any PDF
file. Let's dive in!

## Why Add Margins?

You might wonder why one would need to add margins to a PDF. Here are a couple
of reasons:

1. **Enhanced Note-taking**: Especially when using a stylus or Apple Pencil on
   tablets, having extra space means you can jot down notes without cramping or
   covering the original content.
2. **Clarity**: Keeping your notes separate from the main content helps in
   distinguishing your added thoughts from the original material.

## The Script

Below is the Python script that accomplishes this:

```python
#!/usr/bin/env python3

import os
import sys
import subprocess
from PyPDF2 import PdfReader, PdfWriter, Transformation

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    from PyPDF2 import PdfReader, PdfWriter, Transformation
except ImportError:
    install("PyPDF2")
    from PyPDF2 import PdfReader, PdfWriter, Transformation

def resize_pdf(input_pdf_path, output_pdf_path):
    reader = PdfReader(input_pdf_path)
    writer = PdfWriter()

    for page in reader.pages:
        page_width, page_height = page.mediabox.upper_right
        scale = 0.75
        translate_x = 0
        translate_y = page_height * (1 - scale)

        transformation = Transformation().scale(scale, scale).translate(translate_x, translate_y)
        page.add_transformation(transformation)
        writer.add_page(page)

    with open(output_pdf_path, "wb") as f:
        writer.write(f)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: {os.path.basename(sys.argv[0])} <input_pdf>")
        sys.exit(1)

    input_pdf = sys.argv[1]
    output_pdf = input_pdf.rsplit(".", 1)[0] + "-note-margins.pdf"
    resize_pdf(input_pdf, output_pdf)
    print(f"Processed {input_pdf} and created {output_pdf}")
```

## How It Works

The script leverages the PyPDF2 library to access the content of a specified
PDF. It then resizes each page, shifting the content to one side, thus creating
a margin. Specifically, this script moves the content to the upper left,
producing a margin on the bottom and the right.

I saved this script as `pdfmargins` and placed it in my `bin` directory, which
is included in my system path. If you decide to follow a similar approach,
remember to grant it executable permissions. You can do this with:

```sh
chmod +x pdfmargins
```

Once set up, you can invoke the script from any directory like this:

```sh
pdfmargins my-ebook.pdf
```

Executing this command will generate a new PDF in the same directory, named
`my-ebook-note-margins.pdf`.

## Conclusion

PDFs are a standard format for sharing documents. However, when it comes to
active learning or collaborative feedback, the ability to add notes can enhance
the usefulness of a PDF significantly. With this simple script, you can easily
prepare your PDFs for note-taking on platforms like Notability and GoodNotes.
Give it a try and boost your note-taking game!

Happy coding (and note-taking)!
