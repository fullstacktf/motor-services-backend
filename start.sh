docker-compose down
sudo rm -rf ./motor-services-backend/mysql_data
mkdir ./motor-services-backend/mysql_data
docker-compose build && docker-compose up -d
