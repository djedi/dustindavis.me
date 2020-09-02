#!/bin/bash

function get_images() {
    local directory=$1

    local images=$(perl -ne 'while(/\!\[.*\]\(([^\)]+)\)/g){print "$1\n";}' $directory/index.md)

    local re='-[0-9]'
    for url in $images ; do
        echo $counter
        local full=$(echo $url | sed 's/-[0-9]*x[0-9]*//')
        echo $full
        local pattern='^/'
        if [[ $full =~ $pattern ]] ; then
            echo relative
            full="https://dustindavis.me$full"
        fi
        echo $full
        wget -P $directory/images $full
    done
}

function global_rematch() { 
    local s=$1 regex=$2 
    while [[ $s =~ $regex ]]; do 
        echo "${BASH_REMATCH[1]}"
        s=${s#*"${BASH_REMATCH[1]}"}
    done
}

get_images $1