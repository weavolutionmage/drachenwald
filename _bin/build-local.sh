#!/bin/bash

echo $HELLO_WORLD
pip3 install -r _server_scripts/requirements.txt
curl -k -o _data/groups/grouplist.json "https://scripts.drachenwald.sca.org/json/regnum-groups.json"
curl -k -o _data/groups/officerlist.json "https://scripts.drachenwald.sca.org/json/regnum-officers.json"
curl -k -o _data/archery-ranks.json "https://scripts.drachenwald.sca.org/json/archery-ranks.json"
curl -k -o _data/archery-progression.json "https://scripts.drachenwald.sca.org/json/archery-progression.json"
curl -k -o _data/archery-marshals.json "https://scripts.drachenwald.sca.org/json/archery-marshals.json"
curl -k -o _data/fullcalendar.json "https://scripts.drachenwald.sca.org/json/fullcalendar.json"
curl -k -o _data/groups/groups-special.json "https://scripts.drachenwald.sca.org/json/groups-special.json"
