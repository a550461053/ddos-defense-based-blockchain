#!/bin/bash

N=12  # 总的用户数
M=3   # 总的target数
Abnormal=100 # 异常连接数
# 创建异常连接i
index=1
pre_str1="000"
pre_str2="00"
descriptions=("TCP中SYN握手未完成", "udp数据包异常", "HTTP数据包异常", "DNS反射攻击")
len=${#descriptions[*]}
while [ "$index" -le "$Abnormal" ]
do
	if [ "$index" -le "9" ]; then
		pre_str=$pre_str1
		index1=$((index))
	else
		pre_str=$pre_str2
		index1=$((index))
	fi

		echo "CO_${pre_str}${index}"
  	echo "\n"
  first_split=$((index%5))
  #if [ "$first_split" -ne "0" ]; then # 不是5的倍数，就执行真正的ddos异常连接提交
		if [ "$index" -lt "4" ]; then # 小于4的取随机
			targetIP="114.45.62."
			index2=$((index))
		else
			targetIP="210.73.64."		# 大于=4的是真正构成ddos的异常
			index2=$((index%M+1))
		fi

	index3=$((index%N+1))		# 提交者ID

# 此处增加对index3的位数判断，修改prestr，否则提交显示错误。

	#description=${descriptions[((index%len))]} # 改为随机数
	description=${descriptions[((RANDOM%len))]}
	echo $description
	echo $len
	echo $((RANDOM%len))

	# 创建energy 1
	curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  \
			-d '{"$class": "org.decentralized.energy.network.Energy",
			"energyID": "'"${pre_str}${index1}"'", "targetIP": "'"${targetIP}${index2}"'", "value": "'"$(date +'%s')"'",
			"ownerID": "'"${pre_str1}${index3}"'", "ownerEntity": "Resident","description":"'"${description}"'","flag":"0"}' \
			'http://localhost:3000/api/Energy'

((index++))
done

:<<BLOCK

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  \
    -d '{"$class": "org.decentralized.energy.network.Energy",
    "energyID": "1", "targetIP": "210.73.64.1", "value": "'"$(date +'%s')"'",
    "ownerID": "1", "ownerEntity": "Resident","description":"TCP中SYN握手未完成","flag":"0"}' \
    'http://localhost:3000/api/Energy'
#sleep 1s

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  \
        -d '{"$class": "org.decentralized.energy.network.Energy",
        "energyID": "2", "targetIP": "210.73.64.1", "value": "'"$(date +'%s')"'",
        "ownerID": "2", "ownerEntity": "Resident","description":"udp数据包异常","flag":"0"}' \
        'http://localhost:3000/api/Energy'
#sleep 1s

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  \
            -d '{"$class": "org.decentralized.energy.network.Energy",
            "energyID": "3", "targetIP": "210.73.64.1", "value": "'"$(date +'%s')"'",
            "ownerID": "1", "ownerEntity": "Resident","description":"udp数据包异常","flag":"0"}' \
            'http://localhost:3000/api/Energy'
#sleep 1s

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  \
    -d '{"$class": "org.decentralized.energy.network.Energy",
    "energyID": "4", "targetIP": "210.73.64.2", "value": "'"$(date +'%s')"'",
    "ownerID": "2", "ownerEntity": "Resident","description":"HTTP数据包异常","flag":"0"}' \
    'http://localhost:3000/api/Energy'
#sleep 1s

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  \
    -d '{"$class": "org.decentralized.energy.network.Energy",
    "energyID": "5", "targetIP": "123.43.64.2", "value": "'"$(date +'%s')"'",
    "ownerID": "1", "ownerEntity": "Resident","description":"TCP/SYN握手未完成","flag":"0"}' \
    'http://localhost:3000/api/Energy'
#sleep 1s

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  \
     -d '{"$class": "org.decentralized.energy.network.Energy",
     "energyID": "6", "targetIP": "210.73.64.2", "value": "'"$(date +'%s')"'",
     "ownerID": "3", "ownerEntity": "Resident","description":"DNS反射攻击","flag":"0"}' \
    'http://localhost:3000/api/Energy'
#sleep 1s

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  \
     -d '{"$class": "org.decentralized.energy.network.Energy",
     "energyID": "7", "targetIP": "210.73.64.1", "value": "'"$(date +'%s')"'",
     "ownerID": "1", "ownerEntity": "Resident","description":"udp数据包异常","flag":"0"}' \
     'http://localhost:3000/api/Energy'
#sleep 1s

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  \
   -d '{"$class": "org.decentralized.energy.network.Energy",
   "energyID": "8", "targetIP": "210.73.64.1", "value": "'"$(date +'%s')"'",
   "ownerID": "1", "ownerEntity": "Resident","description":"udp数据包异常","flag":"0"}' \
   'http://localhost:3000/api/Energy'
#sleep 1s
   curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  \
      -d '{"$class": "org.decentralized.energy.network.Energy",
      "energyID": "9", "targetIP": "210.73.64.1", "value": "'"$(date +'%s')"'",
      "ownerID": "4", "ownerEntity": "Resident","description":"udp数据包异常","flag":"0"}' \
      'http://localhost:3000/api/Energy'

BLOCK

# curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"$class": "org.decentralized.energy.network.Energy", "energyID": "56230", "targetIP": "10", "value": "'"$(date +'%s')"'", "ownerID": "12", "ownerEntity": "Resident","description":"udp","flag":"0"}' 'http://localhost:3000/api/Energy'
# sleep 10
#curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Energy'
