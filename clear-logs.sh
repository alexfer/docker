#!/bin/sh

rm -f logs/elastic/node_0/* 2> /dev/null
rm -d logs/elastic/node_0 2> /dev/null
rm -f logs/nginx/*
rm -f logs/supervisor/*
exit 0