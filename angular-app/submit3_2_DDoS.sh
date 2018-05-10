#!/bin/bash


# 创建energy

#statuscode=`curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  -d '{"$class": "org.decentralized.energy.network.Energy", "energyID": "6", "targetIP": "192.168.0.1", "value": "'"$(date +'%s')"'", "ownerID": "2", "ownerEntity": "Resident","description":"udp","flag":"0"}' 'http://localhost:3000/api/Energy'`
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  \
    -d '{
      "$class": "org.decentralized.energy.network.AbnorConToDDoS",
      "energyInc":"resource:org.decentralized.energy.network.Resident#0008"}' \
      'http://localhost:3000/api/AbnorConToDDoS'





# curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"$class": "org.decentralized.energy.network.Energy", "energyID": "56230", "targetIP": "10", "value": "'"$(date +'%s')"'", "ownerID": "12", "ownerEntity": "Resident","description":"udp","flag":"0"}' 'http://localhost:3000/api/Energy'
# sleep 10
#curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Energy'
