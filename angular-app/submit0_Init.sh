#!/bin/bash

# # 删除coins1
# curl -X DELETE --header 'Accept: application/json' \
#     'http://localhost:3000/api/Coins/CO_1'
# # 删除coins2
# curl -X DELETE --header 'Accept: application/json' \
#     'http://localhost:3000/api/Coins/CO_2'
# # 删除coins3
# curl -X DELETE --header 'Accept: application/json' \
#     'http://localhost:3000/api/Coins/CO_3'
# # 删除coins12
# curl -X DELETE --header 'Accept: application/json' \
#     'http://localhost:3000/api/Coins/CO_12'
#
# # 删除cash1
# curl -X DELETE --header 'Accept: application/json' \
#     'http://localhost:3000/api/Cash/CA_1'
# # 删除cash2
# curl -X DELETE --header 'Accept: application/json' \
#     'http://localhost:3000/api/Cash/CA_2'
# # 删除cash3
# curl -X DELETE --header 'Accept: application/json' \
#     'http://localhost:3000/api/Cash/CA_3'
#
# 删除用户1
curl -X DELETE --header 'Accept: application/json' \
    'http://localhost:3000/api/Resident/1'
# 删除用户2
curl -X DELETE --header 'Accept: application/json' \
    'http://localhost:3000/api/Resident/2'
# 删除用户3
curl -X DELETE --header 'Accept: application/json' \
    'http://localhost:3000/api/Resident/3'
# 删除用户4
curl -X DELETE --header 'Accept: application/json' \
    'http://localhost:3000/api/Resident/4'
# 删除用户5
curl -X DELETE --header 'Accept: application/json' \
    'http://localhost:3000/api/Resident/5'
# 删除用户6
curl -X DELETE --header 'Accept: application/json' \
    'http://localhost:3000/api/Resident/6'

    # 删除用户1
    curl -X DELETE --header 'Accept: application/json' \
        'http://localhost:3000/api/Resident/7'
    # 删除用户2
    curl -X DELETE --header 'Accept: application/json' \
        'http://localhost:3000/api/Resident/8'
    # 删除用户3
    curl -X DELETE --header 'Accept: application/json' \
        'http://localhost:3000/api/Resident/9'
    # 删除用户4
    curl -X DELETE --header 'Accept: application/json' \
        'http://localhost:3000/api/Resident/10'
    # 删除用户5
    curl -X DELETE --header 'Accept: application/json' \
        'http://localhost:3000/api/Resident/11'
    # 删除用户6
    curl -X DELETE --header 'Accept: application/json' \
        'http://localhost:3000/api/Resident/12'

# 删除TargetCompany12
# curl -X DELETE --header 'Accept: application/json' \
#     'http://localhost:3000/api/TargetCompany/12'


# 删除Energy
curl -X DELETE --header 'Accept: application/json' 'http://localhost:3000/api/Energy/1'
curl -X DELETE --header 'Accept: application/json' 'http://localhost:3000/api/Energy/2'
curl -X DELETE --header 'Accept: application/json' 'http://localhost:3000/api/Energy/3'
curl -X DELETE --header 'Accept: application/json' 'http://localhost:3000/api/Energy/4'
curl -X DELETE --header 'Accept: application/json' 'http://localhost:3000/api/Energy/5'
curl -X DELETE --header 'Accept: application/json' 'http://localhost:3000/api/Energy/6'
curl -X DELETE --header 'Accept: application/json' 'http://localhost:3000/api/Energy/7'
curl -X DELETE --header 'Accept: application/json' 'http://localhost:3000/api/Energy/8'
curl -X DELETE --header 'Accept: application/json' 'http://localhost:3000/api/Energy/9'

# # 删除DDoS
# curl -X DELETE --header 'Accept: application/json' 'http://localhost:3000/api/DDoS/DDOS_2'

# curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"$class": "org.decentralized.energy.network.Energy", "energyID": "56230", "units": "10", "value": "'"$(date +'%s')"'", "ownerID": "12", "ownerEntity": "Resident","description":"udp","flag":"0"}' 'http://localhost:3000/api/Energy'
# sleep 10
#curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Energy'
