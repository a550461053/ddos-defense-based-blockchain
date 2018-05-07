#!/bin/bash

N=12  # 总的用户数
M=3   # 总的target数
pre_str3="010"
pre_str4="01"
index=1


	# 创建奖励
	#statuscode=`curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  -d '{"$class": "org.decentralized.energy.network.Energy", "energyID": "6", "targetIP": "192.168.0.1", "value": "'"$(date +'%s')"'", "ownerID": "2", "ownerEntity": "Resident","description":"udp","flag":"0"}' 'http://localhost:3000/api/Energy'`
	curl -X POST --header 'Content-Type: application/json' \
			--header 'Accept: application/json'  \
			-d '{
				"$class": "org.decentralized.energy.network.DistributeCoins",
				"coinsInc": "resource:org.decentralized.energy.network.Coins#CO_2",
				"coinsDec": "resource:org.decentralized.energy.network.Coins#CO_0101",
				"targetCompany": "resource:org.decentralized.energy.network.TargetCompany#0101"
			}' \
			'http://localhost:3000/api/DistributeCoins'
	curl -X POST --header 'Content-Type: application/json' \
			--header 'Accept: application/json'  \
			-d '{
				"$class": "org.decentralized.energy.network.DistributeCoins",
				"coinsInc": "resource:org.decentralized.energy.network.Coins#CO_2",
				"coinsDec": "resource:org.decentralized.energy.network.Coins#CO_0102",
				"targetCompany": "resource:org.decentralized.energy.network.TargetCompany#0102"
			}' \
			'http://localhost:3000/api/DistributeCoins'
	curl -X POST --header 'Content-Type: application/json' \
			--header 'Accept: application/json'  \
			-d '{
				"$class": "org.decentralized.energy.network.DistributeCoins",
				"coinsInc": "resource:org.decentralized.energy.network.Coins#CO_2",
				"coinsDec": "resource:org.decentralized.energy.network.Coins#CO_0103",
				"targetCompany": "resource:org.decentralized.energy.network.TargetCompany#0103"
			}' \
			'http://localhost:3000/api/DistributeCoins'



# curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"$class": "org.decentralized.energy.network.Energy", "energyID": "56230", "targetIP": "10", "value": "'"$(date +'%s')"'", "ownerID": "12", "ownerEntity": "Resident","description":"udp","flag":"0"}' 'http://localhost:3000/api/Energy'
# sleep 10
#curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Energy'
