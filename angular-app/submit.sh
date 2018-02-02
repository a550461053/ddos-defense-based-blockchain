#!/bin/bash
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"$class": "org.decentralized.energy.network.Energy", "energyID": "567889", "units": "12", "value": "12", "ownerID": "12", "ownerEntity": "Resident","description":"udp"}' 'http://localhost:3000/api/Energy'
sleep 10
#curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Energy'
