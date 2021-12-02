docker-compose down
sudo rm -rf ./mysql_data
mkdir ./mysql_data
docker-compose build && docker-compose up
