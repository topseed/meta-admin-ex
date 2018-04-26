

Docker:

phusion baseimage

Ondrej php 7.1

Caddy

goofys

Codiad

node

pip


docker commit 4554519f20f0 nbake/nbake:latest

docker push nbake/nbake:latest

docker stop 4554519f20f0

docker system prune -a

docker pull nbake/nbake:latest

docker run -d --privileged -p 8080:8080 -p 8081:8081 nbake/nbake /sbin/my_init

docker exec -ti 01d7f6b59863 /bin/bash
