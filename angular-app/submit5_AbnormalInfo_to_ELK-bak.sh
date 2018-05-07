#!/bin/bash

N=12  # 总的用户数
M=6   # 总的target数
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
  if [ "$index" -lt "4" ]; then # 小于4的取随机
  	targetIP="114.45.62."
  	index2=$((index))
  else
  	targetIP="210.73.64."		# 大于=4的是真正构成ddos的异常
  	index2=$((RANDOM%M+1))  # $((index%M+1))
  fi

	index3=$((index%N+1))		# 提交者ID

# 此处增加对index3的位数判断，修改prestr，否则提交显示错误。

	#description=${descriptions[((index%len))]} # 改为随机数
	description=${descriptions[((RANDOM%len))]}
	echo $description
	echo $len
	echo $((RANDOM%len))

	# 产生随机提交间隔时间
	a=$((RANDOM%10+1))
	sleep_time=$(echo "scale=4; $a / 10" | bc)  # shell不支持浮点数，得用bc实现，也可以用awk
	echo $sleep_time
	sleep $sleep_time

	# 产生随机异常个数
	count_abnormal=$((RANDOM%10+1))

	# 创建energy 1
	curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json'  \
			-d '{"$class": "org.decentralized.energy.network.Energy",
			"count_abnormal": "'"${count_abnormal}"'",
			"energyID": "'"${pre_str}${index1}"'", "targetIP": "'"${targetIP}${index2}"'", "value": "'"$(date +'%s')"'",
			"ownerID": "'"${pre_str1}${index3}"'", "ownerEntity": "Resident","description":"'"${description}"'","flag":"0"}' \
			'http://localhost:9200/elk5/test100'
			#'http://10.10.28.101:9200/elk2/test2'

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
