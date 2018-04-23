# admin

Install this to admin, api, manage, etc your S3 website.


gpl3 - apache


For webmaster. If you know how to install LAMP, then you should be able to do DOcker:
Before start, you should know the Amazon region and bcuket name,
and IAM key and seceret.

Test with CybeDuck 1st


Instal docker host, close to editors. Ex: LA, inside fire wall.
Docker host should run as non root, have own firewall, etc.
Also multi host, ex: one that mounts 'sports' folder.
This docker has node, goofys installed (and other things you may need)

		docker pull nbake/nbake:latest

		docker run -d --privileged -p 8080:8080 nbake/nbake /sbin/my_init

		docker ps

		docker exec -ti YOUR-PID /bin/bash

		cd root

		nohup /root/bin/php-fpm &

		caddy


Make a project in folder s3 (~/html/workspace/s3)
Now goofYs, goofys YOUR-BUCKET-NAME MNT


		cat ~/.aws/credentials
		[default]
		aws_access_key_id = KEY
		aws_secret_access_key = SECRET
		[other]
		aws_access_key_id = KEY2
		aws_secret_access_key = SECRET2


Start

		/root/goofys --profile default -o allow_other --use-content-type narwhal1 /var/www/html/workspace/kurac/s3


Now Api

npm i nbake-admin

configure yaml to the mounted folder, ex config.yaml here

pm2 start ~/node_modules/nbake-admin/index.js

test api with

http://165.227.195.79:3000/api?secret=123&folder=linkBlog&cmd=i





