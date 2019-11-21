echo -e $"Docker Swarm Initialization"
docker swarm init
docker stack deploy -c ./docker-compose.yml talk
echo -e $"Finish"