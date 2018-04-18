#!/bin/bash

N=12  # 总的用户数
M=3   # 总的target数
pre_str3="010"
pre_str4="01"
index=1
while [ "$index" -lt "$M" ]
do
	if [ "$index" -le "9" ]; then
		pre_str=$pre_str3
	else
		pre_str=$pre_str4
	fi

	# 创建奖励
	#statuscode=`curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  -d '{"$class": "org.decentralized.energy.network.Energy", "energyID": "6", "targetIP": "192.168.0.1", "value": "'"$(date +'%s')"'", "ownerID": "2", "ownerEntity": "Resident","description":"udp","flag":"0"}' 'http://localhost:3000/api/Energy'`
	curl -X POST --header 'Content-Type: application/json' \
			--header 'Accept: application/json'  \
			-d '{
				"$class": "org.decentralized.energy.network.DistributeCoins",
				"coinsInc": "resource:org.decentralized.energy.network.Coins#CO_2",
				"coinsDec": "'"resource:org.decentralized.energy.network.Coins#CO_${pre_str}${index}"'",
				"targetCompany": "'"resource:org.decentralized.energy.network.TargetCompany#${pre_str}${index}"'"
			}' \
			'http://localhost:3000/api/DistributeCoins'
((index++))
done



# curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"$class": "org.decentralized.energy.network.Energy", "energyID": "56230", "targetIP": "10", "value": "'"$(date +'%s')"'", "ownerID": "12", "ownerEntity": "Resident","description":"udp","flag":"0"}' 'http://localhost:3000/api/Energy'
# sleep 10
#curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Energy'
