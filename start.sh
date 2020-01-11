#!/usr/bin/env bash
echo -e $"Docker Swarm Initialization"
docker swarm init
echo -e $"Creating Docker Image"
docker build -t graph-microservice -f graph-microservice/Dockerfile graph-microservice
docker build -t car-microservice -f car-microservice/Dockerfile car-microservice
docker build -t products -f products-microservice/Dockerfile products-microservice
docker build -t kitchen -f kitchen-microservice/Dockerfile kitchen-microservice
docker build -t makeorder -f makeorder-microservice/Dockerfile makeorder-microservice
docker build -t frontend -f frontend/Dockerfile frontend
echo -e $"Starting the stack"
docker stack deploy -c ./docker-compose.yml talk
echo -e $"Finish"