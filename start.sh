#!/bin/sh

# ANSI color codes
YELLOW="\033[0;33m"
NC="\033[0m"

# install npm dependencies for client
printf "${YELLOW}Installing npm dependencies for client...${NC}\n"
cd client && npm install && cd ..

# build docker images from dockerfiles
printf "${YELLOW}Building Docker images...${NC}\n"
docker build -t vite-app:latest -f ./client/Dockerfile ./client
docker build -t bottle-app:latest -f ./server/Dockerfile ./server

# run docker-compose
printf "${YELLOW}Running Docker Compose...${NC}\n"
docker-compose up --abort-on-container-exit