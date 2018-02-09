#!/bin/bash


# 创建energy
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  -d '{"$class": "org.decentralized.energy.network.Energy", "energyID": "1", "units": "210.73.64.1", "value": "'"$(date +'%s')"'", "ownerID": "2", "ownerEntity": "Resident","description":"udp data abnormal","flag":"0"}' 'http://localhost:3000/api/Energy'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  -d '{"$class": "org.decentralized.energy.network.Energy", "energyID": "2", "units": "210.73.64.1", "value": "'"$(date +'%s')"'", "ownerID": "1", "ownerEntity": "Resident","description":"TCP SYN handshakes is uncompleted","flag":"0"}' 'http://localhost:3000/api/Energy'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  -d '{"$class": "org.decentralized.energy.network.Energy", "energyID": "3", "units": "210.73.64.1", "value": "'"$(date +'%s')"'", "ownerID": "1", "ownerEntity": "Resident","description":"TCP SYN handshakes is uncompleted","flag":"0"}' 'http://localhost:3000/api/Energy'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  -d '{"$class": "org.decentralized.energy.network.Energy", "energyID": "4", "units": "210.73.64.1", "value": "'"$(date +'%s')"'", "ownerID": "2", "ownerEntity": "Resident","description":"DNS flood","flag":"0"}' 'http://localhost:3000/api/Energy'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  -d '{"$class": "org.decentralized.energy.network.Energy", "energyID": "5", "units": "123.25.56.8", "value": "'"$(date +'%s')"'", "ownerID": "2", "ownerEntity": "Resident","description":"HTTP flood","flag":"0"}' 'http://localhost:3000/api/Energy'



# curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"$class": "org.decentralized.energy.network.Energy", "energyID": "56230", "units": "10", "value": "'"$(date +'%s')"'", "ownerID": "12", "ownerEntity": "Resident","description":"udp","flag":"0"}' 'http://localhost:3000/api/Energy'
# sleep 10
#curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Energy'
