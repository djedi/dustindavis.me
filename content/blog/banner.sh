#!/bin/bash

curl $1 | grep -Eo 'twitter:creator.+ on Unsplash"' | pbcopy