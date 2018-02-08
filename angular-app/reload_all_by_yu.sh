#cd ../fabric-tools/
#./stopFabric.sh
rm ../dist/decentralized-energy-network.bna
cd ../
#npm install


composer archive create --sourceType dir --sourceName . -a ./dist/decentralized-energy-network.bna
composer network update -a ./dist/decentralized-energy-network.bna -c admin@decentralized-energy-network
cd ./dist


#cd fabric-tools/
#./startFabric.sh
#cd ../dist
#composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName decentralized-energy-network
#composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile decentralized-energy-network.bna --file networkadmin.card
cd ../angular-app/
npm start

# composer-rest-server
#bash submit.sh
