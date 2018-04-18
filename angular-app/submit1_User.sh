#!/bin/bash

# 循环实现，需要考虑每一个用户的：
# 	coins的coinsID和ownerID
# 	bash的coinsID和ownerID
# 	"residentID": "10",
#   "firstName": "wqwr",
# 	"lastName": "wqwr",
#		"coins": "resource:org.decentralized.energy.network.Coins#CO_5",
# 	"cash": "resource:org.decentralized.energy.network.Cash#CA_5"


# 创建用户i
index=1
N=12  # 总的用户数
M=3   # 总的target数
pre_str1="000"
pre_str2="00"
while [ "$index" -lt "$N" ]
do
	if [ "$index" -le "9" ]; then
		pre_str=$pre_str1
	else
		pre_str=$pre_str2
	fi

		echo "CO_${pre_str}${index}"
  	echo "\n"
	# 创建coins1
	curl -X POST --header 'Content-Type: application/json' \
			--header 'Accept: application/json' \
			-d '{"$class": "org.decentralized.energy.network.Coins",
						"coinsID": "'"CO_${pre_str}${index}"'", "value": 5,
						"ownerID": "'"${pre_str}${index}"'", "ownerEntity": "Resident"}' \
			'http://localhost:3000/api/Coins'

	# 创建cash1
	curl -X POST --header 'Content-Type: application/json' \
			--header 'Accept: application/json' \
			-d '{"$class": "org.decentralized.energy.network.Cash",
						"cashID": "'"CA_${pre_str}${index}"'", "value": 5, "currency": "USD",
						"ownerID": "'"${pre_str}${index}"'", "ownerEntity": "Resident"}' \
			'http://localhost:3000/api/Cash'

	# 创建用户2
  echo "user${pre_str}${index} \n"
  curl -X POST --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      -d '{
            "$class": "org.decentralized.energy.network.Resident",
            "residentID": "'"${pre_str}${index}"'",
            "firstName": "'"q${pre_str}${index}"'",
            "lastName": "'"qw${pre_str}${index}"'",
            "coins": "'"resource:org.decentralized.energy.network.Coins#CO_${pre_str}${index}"'",
            "cash": "'"resource:org.decentralized.energy.network.Cash#CA_${pre_str}${index}"'"
          }' \
      'http://localhost:3000/api/Resident'
((index++))
done



# 创建Target i
index=1
pre_str3="010"
pre_str4="01"
while [ "$index" -lt "$M" ]
do
	if [ "$index" -le "9" ]; then
		pre_str=$pre_str3
	else
		pre_str=$pre_str4
	fi
	echo "CO_${pre_str}${index}"
	echo "\n"
	# 创建coins1
	curl -X POST --header 'Content-Type: application/json' \
			--header 'Accept: application/json' \
			-d '{"$class": "org.decentralized.energy.network.Coins",
						"coinsID": "'"CO_${pre_str}${index}"'", "value": 500,
						"ownerID": "'"${pre_str}${index}"'", "ownerEntity": "Resident"}' \
			'http://localhost:3000/api/Coins'

	# 创建Target 12
	curl -X POST --header 'Content-Type: application/json' \
		--header 'Accept: application/json' \
		-d '{
		 "$class": "org.decentralized.energy.network.TargetCompany",
		 "utilityID": "'"${pre_str}${index}"'",
		 "name": "'"test${pre_str}${index}"'",
		 "targetIP": "'"210.73.64.${index}"'",
		 "coins": "'"resource:org.decentralized.energy.network.Coins#CO_${pre_str}${index}"'"
	 }' \
	 'http://localhost:3000/api/TargetCompany'
((index++))
done


:<<BLOCK

# 创建coins2
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{"$class": "org.decentralized.energy.network.Coins",
          "coinsID": "CO_2", "value": 5,
          "ownerID": "2", "ownerEntity": "Resident"}' \
    'http://localhost:3000/api/Coins'
# 创建coins3
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{"$class": "org.decentralized.energy.network.Coins",
          "coinsID": "CO_3", "value": 5,
          "ownerID": "3", "ownerEntity": "Resident"}' \
    'http://localhost:3000/api/Coins'
# 创建coins4
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{"$class": "org.decentralized.energy.network.Coins",
          "coinsID": "CO_4", "value": 5,
          "ownerID": "1", "ownerEntity": "Resident"}' \
    'http://localhost:3000/api/Coins'
# 创建coins5
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{"$class": "org.decentralized.energy.network.Coins",
          "coinsID": "CO_5", "value": 5,
          "ownerID": "2", "ownerEntity": "Resident"}' \
    'http://localhost:3000/api/Coins'
# 创建coins6
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{"$class": "org.decentralized.energy.network.Coins",
          "coinsID": "CO_6", "value": 5,
          "ownerID": "3", "ownerEntity": "Resident"}' \
    'http://localhost:3000/api/Coins'
# 创建coins12
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{"$class": "org.decentralized.energy.network.Coins",
          "coinsID": "CO_12", "value": 500,
          "ownerID": "12", "ownerEntity": "TargetCompany"}' \
    'http://localhost:3000/api/Coins'
# 创建coins13
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{"$class": "org.decentralized.energy.network.Coins",
          "coinsID": "CO_13", "value": 500,
          "ownerID": "13", "ownerEntity": "TargetCompany"}' \
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
# 创建cash3
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{"$class": "org.decentralized.energy.network.Cash",
          "cashID": "CA_3", "value": 5, "currency": "USD",
          "ownerID": "3", "ownerEntity": "Resident"}' \
    'http://localhost:3000/api/Cash'
# 创建cash4
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{"$class": "org.decentralized.energy.network.Cash",
          "cashID": "CA_4", "value": 5, "currency": "USD",
          "ownerID": "1", "ownerEntity": "Resident"}' \
    'http://localhost:3000/api/Cash'
# 创建cash5
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{"$class": "org.decentralized.energy.network.Cash",
          "cashID": "CA_5", "value": 5, "currency": "USD",
          "ownerID": "2", "ownerEntity": "Resident"}' \
    'http://localhost:3000/api/Cash'
# 创建cash6
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{"$class": "org.decentralized.energy.network.Cash",
          "cashID": "CA_6", "value": 5, "currency": "USD",
          "ownerID": "3", "ownerEntity": "Resident"}' \
    'http://localhost:3000/api/Cash'

# 创建用户1
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{
          "$class": "org.decentralized.energy.network.Resident",
          "residentID": "1",
          "firstName": "q",
          "lastName": "q",
          "coins": "resource:org.decentralized.energy.network.Coins#CO_1",
          "cash": "resource:org.decentralized.energy.network.Cash#CA_1"
        }' \
    'http://localhost:3000/api/Resident'
echo "user1 \n"
sleep 1s

# 创建用户2
echo "user2 \n"
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{
          "$class": "org.decentralized.energy.network.Resident",
          "residentID": "2",
          "firstName": "qw",
          "lastName": "qw",
          "coins": "resource:org.decentralized.energy.network.Coins#CO_2",
          "cash": "resource:org.decentralized.energy.network.Cash#CA_2"
        }' \
    'http://localhost:3000/api/Resident'
sleep 1s
# 创建用户3
echo "user3 \n"
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{
          "$class": "org.decentralized.energy.network.Resident",
          "residentID": "3",
          "firstName": "qwr",
          "lastName": "qwr",
          "coins": "resource:org.decentralized.energy.network.Coins#CO_3",
          "cash": "resource:org.decentralized.energy.network.Cash#CA_3"
        }' \
    'http://localhost:3000/api/Resident'
# sleep 1s
# 创建用户4
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{
          "$class": "org.decentralized.energy.network.Resident",
          "residentID": "4",
          "firstName": "qwwr",
          "lastName": "qwer",
          "coins": "resource:org.decentralized.energy.network.Coins#CO_4",
          "cash": "resource:org.decentralized.energy.network.Cash#CA_4"
        }' \
    'http://localhost:3000/api/Resident'
# sleep 1s
# 创建用户5
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{
          "$class": "org.decentralized.energy.network.Resident",
          "residentID": "5",
          "firstName": "wqwr",
          "lastName": "wqwr",
          "coins": "resource:org.decentralized.energy.network.Coins#CO_5",
          "cash": "resource:org.decentralized.energy.network.Cash#CA_5"
        }' \
    'http://localhost:3000/api/Resident'
# sleep 1s
# 创建用户6
curl -X POST --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d '{
          "$class": "org.decentralized.energy.network.Resident",
          "residentID": "6",
          "firstName": "weqwr",
          "lastName": "wqewr",
          "coins": "resource:org.decentralized.energy.network.Coins#CO_6",
          "cash": "resource:org.decentralized.energy.network.Cash#CA_6"
        }' \
    'http://localhost:3000/api/Resident'
    # 创建用户7
    curl -X POST --header 'Content-Type: application/json' \
        --header 'Accept: application/json' \
        -d '{
              "$class": "org.decentralized.energy.network.Resident",
              "residentID": "7",
              "firstName": "qw",
              "lastName": "qw",
              "coins": "resource:org.decentralized.energy.network.Coins#CO_2",
              "cash": "resource:org.decentralized.energy.network.Cash#CA_2"
            }' \
        'http://localhost:3000/api/Resident'
# sleep 1s
    # 创建用户8
    curl -X POST --header 'Content-Type: application/json' \
        --header 'Accept: application/json' \
        -d '{
              "$class": "org.decentralized.energy.network.Resident",
              "residentID": "8",
              "firstName": "qwr",
              "lastName": "qwr",
              "coins": "resource:org.decentralized.energy.network.Coins#CO_3",
              "cash": "resource:org.decentralized.energy.network.Cash#CA_3"
            }' \
        'http://localhost:3000/api/Resident'
    # 创建用户9
    # sleep 1s
    curl -X POST --header 'Content-Type: application/json' \
        --header 'Accept: application/json' \
        -d '{
              "$class": "org.decentralized.energy.network.Resident",
              "residentID": "9",
              "firstName": "qwwr",
              "lastName": "qwer",
              "coins": "resource:org.decentralized.energy.network.Coins#CO_4",
              "cash": "resource:org.decentralized.energy.network.Cash#CA_4"
            }' \
        'http://localhost:3000/api/Resident'
    # sleep 1s
    # 创建用户10
    curl -X POST --header 'Content-Type: application/json' \
        --header 'Accept: application/json' \
        -d '{
              "$class": "org.decentralized.energy.network.Resident",
              "residentID": "10",
              "firstName": "wqwr",
              "lastName": "wqwr",
              "coins": "resource:org.decentralized.energy.network.Coins#CO_5",
              "cash": "resource:org.decentralized.energy.network.Cash#CA_5"
            }' \
        'http://localhost:3000/api/Resident'
    # sleep 1s
    # 创建用户11
    curl -X POST --header 'Content-Type: application/json' \
        --header 'Accept: application/json' \
        -d '{
              "$class": "org.decentralized.energy.network.Resident",
              "residentID": "11",
              "firstName": "weqwr",
              "lastName": "wqewr",
              "coins": "resource:org.decentralized.energy.network.Coins#CO_6",
              "cash": "resource:org.decentralized.energy.network.Cash#CA_6"
            }' \
        'http://localhost:3000/api/Resident'

# 创建Target 12
curl -X POST --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  -d '{
   "$class": "org.decentralized.energy.network.TargetCompany",
   "utilityID": "12",
   "name": "test12",
   "targetIP": "210.73.64.1",
   "coins": "resource:org.decentralized.energy.network.Coins#CO_12"
 }' \
 'http://localhost:3000/api/TargetCompany'

# 创建Target 13
curl -X POST --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  -d '{
   "$class": "org.decentralized.energy.network.TargetCompany",
   "utilityID": "13",
   "name": "test13",
   "targetIP": "210.73.64.2",
   "coins": "resource:org.decentralized.energy.network.Coins#CO_13"
 }' \
 'http://localhost:3000/api/TargetCompany'

BLOCK

:<<BLOCK

BLOCK
# curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"$class": "org.decentralized.energy.network.Energy", "energyID": "56230", "targetIP": "10", "value": "'"$(date +'%s')"'", "ownerID": "12", "ownerEntity": "Resident","description":"udp","flag":"0"}' 'http://localhost:3000/api/Energy'
# sleep 10
#curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Energy'
