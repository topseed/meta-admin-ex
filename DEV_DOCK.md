

Docker:

phusion baseimage

Ondrej php 7.1

Caddy

goofys

Codiad

node

pip

docker login cekvenich

docker commit 3970d8cf5d37 nbake/nbake:latest

docker push nbake/nbake:latest

docker stop 3970d8cf5d37

docker system prune -a

docker pull nbake/nbake:latest

docker run -d --privileged -p 8080:8080 -p 8081:8081 nbake/nbake /sbin/my_init

docker exec -ti 8519e576e055 /bin/bash
