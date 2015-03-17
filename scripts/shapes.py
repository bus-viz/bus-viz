#!/usr/bin/python
# Script to convert GTFS shapes to geojson
import sys
import csv
import json

def main(argv):
    if len(argv) < 1:
        print "Usage: ./shapes.py outputFile.json [inputFile.txt]"

    features = []
    shape_id = None

    csvFile = open(argv[1])
    reader = csv.DictReader(csvFile)

    for row in reader:
        if row['shape_id'] != shape_id:
            # new shape!
            feature = {
                'type': 'Feature',
                'properties': {
                    'shape_id': row['shape_id']
                },
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [[float(row['shape_pt_lon']), float(row['shape_pt_lat'])]]
                }
            }
            features.append(feature)
        else:
            print features[-1].keys()
            features[-1]['geometry']['coordinates'].append([float(row['shape_pt_lon']), float(row['shape_pt_lat'])])

        shape_id = row['shape_id']

    with open(argv[0], 'w') as outfile:
        outfile.write("var bus_shapes = " + json.dumps({'type': 'FeatureCollection', 'features': features}))


if __name__ == "__main__":
    main(sys.argv[1:])
