# admin

Install this to admin, api, manage, etc your S3 website.


gpl3

For webmaster. If you know how to install LAMP, then you should be able to do DOcker:

Instal docker host, close to editors. Ex: LA.
Also multi host, ex: one that mounts 'sports' folder.
This docker has node, goofys installed (and other things you may need)


		docker pull nbake/nbake:latest

		docker run -d -p 8080:8080 -p 8081:8081 nbake/nbake /sbin/my_init

		docker ps

		docker exec -ti f7d658fb8978 /bin/bash

		cd root

edit .aws/config

npm i nbake-admin

configure yaml to the mounted folder, ex config.yaml here

pm2 start ~/node_modules/nbake-admin/index.js

test api with

http://165.227.195.79:3000/api?secret=123&folder=linkBlog&cmd=i


