import csv
import json
import codecs

f = open('houses.json', 'r')
geometry = json.loads(f.read())

for feature in geometry['features']:
    id = feature["properties"]["id"]
    feature["properties"]["people"] = []
    f = open('people_shot2.csv', 'r')
    attrs = csv.DictReader(f, delimiter=';', quotechar='"')
    for row in attrs:
        if row['house_id'] == str(id):
            feature["properties"]["people"].append(dict(
                name=row['fio'].decode('utf-8'),
                about=row['about'].decode('utf-8')
            ))

with codecs.open('data.txt', 'w', 'utf-8') as f:
    f.write(json.dumps(geometry, ensure_ascii=False))
