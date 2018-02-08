#!/bin/bash

# 创建coins1
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{"$class": "org.decentralized.energy.network.Coins",
          "coinsID": "CO_1", "value": 5,
          "ownerID": "1", "ownerEntity": "Resident"}' \
    'http://localhost:3000/api/Coins'

# 创建coins2
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{"$class": "org.decentralized.energy.network.Coins",
          "coinsID": "CO_2", "value": 5,
          "ownerID": "2", "ownerEntity": "Resident"}' \
    'http://localhost:3000/api/Coins'

# 创建cash1
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{"$class": "org.decentralized.energy.network.Cash",
          "cashID": "CA_1", "value": 5, "currency": "USD",
          "ownerID": "1", "ownerEntity": "Resident"}' \
    'http://localhost:3000/api/Cash'
# 创建cash2
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{"$class": "org.decentralized.energy.network.Cash",
          "cashID": "CA_2", "value": 5, "currency": "USD",
          "ownerID": "2", "ownerEntity": "Resident"}' \
    'http://localhost:3000/api/Cash'

# 创建energy
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{"$class": "org.decentralized.energy.network.Energy",
          "energyID": "1", "units": "192.168.0.1", "value": "'"$(date +'%s')"'",
          "ownerID": "1", "ownerEntity": "Resident","description":"udp","flag":"0"}' \
    'http://localhost:3000/api/Energy'

curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{"$class": "org.decentralized.energy.network.Energy",
          "energyID": "2", "units": "192.168.0.1", "value": "'"$(date +'%s')"'",
          "ownerID": "2", "ownerEntity": "Resident","description":"udp","flag":"0"}' \
    'http://localhost:3000/api/Energy'

# 创建用户1
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{
          "$class": "org.decentralized.energy.network.Resident",
          "residentID": "1",
          "firstName": "q",
          "lastName": "q",
          "coins": "resource:org.decentralized.energy.network.Coins#CO_1",
          "cash": "resource:org.decentralized.energy.network.Cash#CA_1",
          "energy": "resource:org.decentralized.energy.network.Energy#1"
        }' \
    'http://localhost:3000/api/Resident'

# 创建用户2
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{
          "$class": "org.decentralized.energy.network.Resident",
          "residentID": "2",
          "firstName": "qw",
          "lastName": "qw",
          "coins": "resource:org.decentralized.energy.network.Coins#CO_2",
          "cash": "resource:org.decentralized.energy.network.Cash#CA_2",
          "energy": "resource:org.decentralized.energy.network.Energy#2"
        }' \
    'http://localhost:3000/api/Resident'



# curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"$class": "org.decentralized.energy.network.Energy", "energyID": "56230", "units": "10", "value": "'"$(date +'%s')"'", "ownerID": "12", "ownerEntity": "Resident","description":"udp","flag":"0"}' 'http://localhost:3000/api/Energy'
# sleep 10
#curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Energy'
