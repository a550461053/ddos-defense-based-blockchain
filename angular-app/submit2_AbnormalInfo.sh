#!/bin/bash

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  \
    -d '{"$class": "org.decentralized.energy.network.Energy",
    "energyID": "1", "targetIP": "210.73.64.1", "value": "'"$(date +'%s')"'",
    "ownerID": "1", "ownerEntity": "Resident","description":"TCP中SYN握手未完成","flag":"0"}' \
    'http://localhost:3000/api/Energy'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  \
        -d '{"$class": "org.decentralized.energy.network.Energy",
        "energyID": "2", "targetIP": "210.73.64.1", "value": "'"$(date +'%s')"'",
        "ownerID": "2", "ownerEntity": "Resident","description":"udp数据包异常","flag":"0"}' \
        'http://localhost:3000/api/Energy'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  \
            -d '{"$class": "org.decentralized.energy.network.Energy",
            "energyID": "3", "targetIP": "210.73.64.1", "value": "'"$(date +'%s')"'",
            "ownerID": "1", "ownerEntity": "Resident","description":"udp数据包异常","flag":"0"}' \
            'http://localhost:3000/api/Energy'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  \
    -d '{"$class": "org.decentralized.energy.network.Energy",
    "energyID": "4", "targetIP": "210.73.64.1", "value": "'"$(date +'%s')"'",
    "ownerID": "2", "ownerEntity": "Resident","description":"HTTP数据包异常","flag":"0"}' \
    'http://localhost:3000/api/Energy'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  \
    -d '{"$class": "org.decentralized.energy.network.Energy",
    "energyID": "5", "targetIP": "123.43.64.2", "value": "'"$(date +'%s')"'",
    "ownerID": "1", "ownerEntity": "Resident","description":"TCP/SYN握手未完成","flag":"0"}' \
    'http://localhost:3000/api/Energy'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  \
     -d '{"$class": "org.decentralized.energy.network.Energy",
     "energyID": "6", "targetIP": "210.73.64.1", "value": "'"$(date +'%s')"'",
     "ownerID": "3", "ownerEntity": "Resident","description":"DNS反射攻击","flag":"0"}' \
    'http://localhost:3000/api/Energy'

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  \
     -d '{"$class": "org.decentralized.energy.network.Energy",
     "energyID": "7", "targetIP": "210.73.64.1", "value": "'"$(date +'%s')"'",
     "ownerID": "1", "ownerEntity": "Resident","description":"udp数据包异常","flag":"0"}' \
     'http://localhost:3000/api/Energy'


# curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"$class": "org.decentralized.energy.network.Energy", "energyID": "56230", "targetIP": "10", "value": "'"$(date +'%s')"'", "ownerID": "12", "ownerEntity": "Resident","description":"udp","flag":"0"}' 'http://localhost:3000/api/Energy'
# sleep 10
#curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Energy'
