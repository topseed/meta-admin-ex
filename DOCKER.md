# nbake-admin and services setup

0. You should have deployed a static 'nbake' app. - and be able to access the files via FTP.

1. Install docker on a remote host via one click install provider. You need a host, for Docker, there are two dozens hosting providers offering Docker hosting, vultr or Digital Ocean - they provide a
one click install. You should pick a location very close to your development team, and likely run two hosts: ex: LA and NYC or sports and other. Or a Webmaster can install Docker in the DMZ of your company.
So: sign up ($5) for a host that has docker installed and connect to the host. If linux SSH if Windows host: RDS is commonom.


2. Once Docker is installed, lets donwload a working container image for nbake admin:

		// download the nbake container image
		docker pull nbake/nbake:latest

		// start that app container with ports 8080 for IDE and 8081 for admin:
		docker run -d nbake/nbake /sbin/my_init

		docker run -d --privileged -p 8080:8080 -p 8081:8081 nbake/nbake /sbin/my_init

		// get the container PID
		docker ps

		//enter the container
		docker exec -ti xYOUR-PIDx /bin/bash

		// now you are inside the container:
		cd root
		ls -la

		//and you may what to check the speed of the Docker host provider
		pip install speedtest-cli
		speedtest-cli

You should now have a container where you can run node, for admin or any service that you can't do purley client side.


3. Mount the ftp drive of admin

4. Month the ftp drive of the app

5. Get the latest version of the example admin app:
 http://github.com/topseed/meta-admin-ex/tree/master/exMeta2


# ssh server
https://help.ubuntu.com/lts/serverguide/openssh-server.html



5. Last step: install nbake web admin on port 8081 so we can ask for a build. This is for

		//edit cofig.yaml as needed. It has the secret code to use for the admin and points where the S3 is. Change the secret code

		// start node, tell it where admin.yaml is
		pm2 start ~/nbake/node_modules/nbake-admin/index.js -- ~/nbake-admin
		pm2 ls

Now in your browser go to http://YOUR-HOST-IP:8081

You should be able to build a folder/page that you edited.



# Optional
## Codiad:
		//start PHP
		nohup /root/bin/php-fpm &
		(enter)

		//start http server w/ IDE on 8080
		cat ~/Caddyfile
		caddy &


 Now open your browser (Chrome is best, it supports QUIC and so does Caddy), by going to http://YOUR-HOST-IP:8080

- From the browser, make a new project 's3' in folder 's3' - and click 'install'.

- login

- opptional Right click the project, and create a dummy file in the IDE and save.

- Now exit browser and go back to the ssh.

You'll need to know the project folder, I'll assume 's3'. Check that file exists in the ~/workspace.

