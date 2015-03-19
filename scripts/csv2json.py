#!/usr/bin/python

# Script to quickly convert a csv file to a json file
# Written by Taylor Denouden 13/03/2015
import sys
import csv
import json

def main(argv):
    if len(argv)!=2:
        print "Usage: ./csv2json.py inputFileName outputFileName"
        exit()

    csvfile = open(argv[0], 'r')
    jsonfile = open(argv[1], 'w')

    fieldnames = csv.reader(csvfile).next()
    reader = csv.DictReader( csvfile, fieldnames)
    for row in reader:
        json.dump(row, jsonfile)
        jsonfile.write('\n')

if __name__ == "__main__":
    main(sys.argv[1:])
