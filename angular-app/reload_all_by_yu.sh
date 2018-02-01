cd ../fabric-tools/
./stopFabric.sh
cd ../
npm install
cd fabric-tools/
./startFabric.sh
cd ../dist
composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName decentralized-energy-network
composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile decentralized-energy-network.bna --file networkadmin.card
cd ../angular-app/
npm start
