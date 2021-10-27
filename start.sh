docker-compose down
sudo rm -rf ./server/mysql_data
mkdir ./server/mysql_data
docker-compose build && docker-compose up