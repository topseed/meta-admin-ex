

baseimage

Ondrej
php

goofys

Codiad

node

pip


docker commit 142ea243847b nbake/nbake:latest

docker push nbake/nbake:latest

docker stop 765ca3b5081b

docker system prune -a

docker pull nbake/nbake:latest

docker run -d --privileged -p 8080:8080 nbake/nbake /sbin/my_init
