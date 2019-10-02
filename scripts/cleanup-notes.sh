#! /usr/bin/bash

sed \
    -e 's|–|-|g' \
    -e 's|–|-|g' \
    -e 's|“|"|g' \
    -e 's|”|"|g' \
    -e 's|&quot;|"|g' \
    -e "s|’|'|g"
