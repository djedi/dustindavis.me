---
slug: get-latest-python-package-version
title: Get Latest Python Package Version
date: 2023-11-08
author: Dustin Davis
description:
  Discover how to quickly determine the latest version of any Python package for
  your requirements.txt file. Our script simplifies Python package management,
  saving you time and ensuring you always have the most recent updates. Perfect
  for Python developers who value efficiency.
categories:
  - Python
  - cli
  - bash
banner: ./images/python-packages.png
bannerCredit:
---

When you need to add a package to your `requirements.txt` file how do you know
what version to use? Well, if you're like me, you may have done one of the
following:

1. Install the package and see what version it installed, then add it to your
   requirements file.
2. Run `pip freeze | grep <package_name>` and see what version is installed and
   then add it to your requirements file.
3. Go to pypi.org and look for the package and see what the latest version is.

Have you ever wished there were a command to just tell you what the latest
version of a package is? Well, there is:

```shell
pip index versions <package_name>
```

This will give you output like this:

```text
WARNING: pip index is currently an experimental command. It may be removed/changed in a future release without prior warning.
requests (2.31.0)
Available versions: 2.31.0, 2.30.0, 2.29.0, 2.28.2, 2.28.1, 2.28.0, 2.27.1, 2.27.0, 2.26.0, 2.25.1, 2.25.0, 2.24.0, 2.23.0, 2.22.0, 2.21.0, 2.20.1, 2.20.0, 2.19.1, 2.19.0, 2.18.4, 2.18.3, 2.18.2, 2.18.1, 2.18.0, 2.17.3, 2.17.2, 2.17.1, 2.17.0, 2.16.5, 2.16.4, 2.16.3, 2.16.2, 2.16.1, 2.16.0, 2.15.1, 2.14.2, 2.14.1, 2.14.0, 2.13.0, 2.12.5, 2.12.4, 2.12.3, 2.12.2, 2.12.1, 2.12.0, 2.11.1, 2.11.0, 2.10.0, 2.9.2, 2.9.1, 2.9.0, 2.8.1, 2.8.0, 2.7.0, 2.6.2, 2.6.1, 2.6.0, 2.5.3, 2.5.2, 2.5.1, 2.5.0, 2.4.3, 2.4.2, 2.4.1, 2.4.0, 2.3.0, 2.2.1, 2.2.0, 2.1.0, 2.0.1, 2.0.0, 1.2.3, 1.2.2, 1.2.1, 1.2.0, 1.1.0, 1.0.4, 1.0.3, 1.0.2, 1.0.1, 1.0.0, 0.14.2, 0.14.1, 0.14.0, 0.13.9, 0.13.8, 0.13.7, 0.13.6, 0.13.5, 0.13.4, 0.13.3, 0.13.2, 0.13.1, 0.13.0, 0.12.1, 0.12.0, 0.11.2, 0.11.1, 0.10.8, 0.10.7, 0.10.6, 0.10.4, 0.10.3, 0.10.2, 0.10.1, 0.10.0, 0.9.3, 0.9.2, 0.9.1, 0.9.0, 0.8.9, 0.8.8, 0.8.7, 0.8.6, 0.8.5, 0.8.4, 0.8.3, 0.8.2, 0.8.1, 0.8.0, 0.7.6, 0.7.5, 0.7.4, 0.7.3, 0.7.2, 0.7.1, 0.7.0, 0.6.6, 0.6.5, 0.6.4, 0.6.3, 0.6.2, 0.6.1, 0.6.0, 0.5.1, 0.5.0, 0.4.1, 0.4.0, 0.3.4, 0.3.3, 0.3.2, 0.3.1, 0.3.0, 0.2.4, 0.2.3, 0.2.2, 0.2.1, 0.2.0
```

I could then add `requests==2.31.0`

But, being the lazy man I am, and knowing I'm going to forget this command by
the time I save my requirements file, I wrote a script to make it even easier.

First, create the script (`~/bin` is in my PATH):

```shell
touch ~/bin/piplatest && chmod +x ~/bin/piplatest
```

Then add the following to this new file:

```bash
#!/bin/bash

# Check if an argument is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <package_name>"
    exit 1
fi

# Use pip to get the latest version of the package
latest_version=$(pip index versions "$1" 2>/dev/null | egrep -o '([0-9]+\.){2}[0-9]+' | head -n 1)

# Check if pip index returned a version string
if [ -z "$latest_version" ]; then
    echo "Could not find the latest version for the package '$1'."
    exit 1
fi

# Output the package name with the latest version in requirements format
echo "$1==$latest_version"
```

Now I just run `piplatest requests` and I get the output `requests==2.31.0`.
Even better, I run `piplatest requests | pbcopy` and it will put it on my
clipboard for me to paste to my requirements file. (If you don't have `pbcopy`
you can install it via `brew install pbcopy`)
