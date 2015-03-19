#!/usr/bin/python
# Written by Taylor Denouden March 17, 2014

# Script to convert GTFS stops to geojson

import sys
import csv
import json

def main(argv):
    if len(argv) < 1:
        print "Usage: ./stops.py outFile.js [/path/to/stops.txt]"

    csvFile = open(argv[1] if argv[1] else "stops.txt")
    features = []

    for row in csv.DictReader(csvFile):
        feature = {
            'type': 'Feature',
            'properties': {
              'stop_id': row['stop_id'],
              'stop_name': row['stop_name'],
              'location_type': row['location_type'],
              'parent_station': row['parent_station'],
              'stop_short_name': row['stop_short_name']
            },
            'geometry': {
              'type': 'Point',
              'coordinates': [float(row['stop_lon']), float(row['stop_lat'])]
            }
        }
        features.append(feature)

    with open(argv[0], 'w') as outfile:
        outfile.write("var bus_stops = " + json.dumps({'type': 'FeatureCollection', 'features': features}))

if __name__ == "__main__":
    main(sys.argv[1:])
