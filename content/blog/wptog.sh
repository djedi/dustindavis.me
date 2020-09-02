#!/bin/bash

function migrate() {
    local filename=$1
    echo $filename
    local base=`basename $filename`
    echo $base
    local dirname=${base//\.md/}
    echo $dirname
    mkdir -p $dirname/images
    mv $filename $dirname/index.md
    prettier -w $dirname/index.md
}

migrate $1