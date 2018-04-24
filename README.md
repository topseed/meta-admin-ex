# admin

For webmasters, install this to admin and build your S3 & markup(Pug) based webapp.

Pre-requsites: There is about a dozen S3 hosting corps, not just AWS, ex: Digital Ocean Spaces.
You should have S3 key, secret and bucket-name (from your manager?) and tested
the password work, ex: upload a sample via CyberDuck (FTP) - before you start the admin install.
( check http://github.com/topseed/nbake-user )

If you know how to install LAMP, then you should be able to do this docker based install. It should take about an hour first time., here we go:

1. We need a host for Docker, there are two dozen hosting providers where you can install a Docker host.
The Docker host should be very close to your development team due to IDE keystroke latency, the closer the better. Also, OK to have more than one. For example NYC and LA if you have two teams or one for sport-section and one for other.
It is not supported to run Docker locally on PC|Mac. Also if you get stuck, you may need
someone to help you with your Docker image via remote SSH - so keep that in mind.
So now, install Docker on your host
and run as non root. Also it goes without saying you should secure you Docker host.

2. Once Docker is installed, lets get a working image for this to continously build the pug on your S3 hosted webapp.

		// gets the image from baseimage that has goofYs for S3, a group PHP IDE Codiad and node to build the edited Pug installed:
		docker pull nbake/nbake:latest

		// start the downloaded container with ports 8080 for IDE and 8081 for admin:
		docker run -d --privileged -p 8080:8080 -p 8081:8081 nbake/nbake /sbin/my_init

		// get the PID
		docker ps

		//enter the container
		docker exec -ti YOUR-PID /bin/bash

		// now inside the container:
		cd root
		ls -la

		//start PHP
		nohup /root/bin/php-fpm &
		(enter)

		//start http server w/ IDE on 8080
		caddy &

So far we setup the free Codiad IDE in the container.

3. Now open your browser (Chrome supports QUIC and so does Caddy), by going to http://YOUR-HOST-IP:8080

- Make a project in folder 's3'. Create a dummy file in the IDE.
You'll need to know the project folder, I assume 's3'. You can ssh to /root/html/workspace/s3
to see the file.

4. Now goofYs to map to your 'S3', where the webapp is:

		~/goofys YOUR-BUCKET-NAME /root/html/workspace/s3

		//edit your credentials [other] part is very optional, if you have other S3 or buckets:
		cat ~/.aws/credentials
		[default]
		aws_access_key_id = KEY
		aws_secret_access_key = SECRET
		[other]
		aws_access_key_id = KEY2
		aws_secret_access_key = SECRET2


		// mount S3:
		/root/goofys --profile default -o allow_other --use-content-type narwhal1 /var/www/html/workspace/s3

		// check to see your S3 webapp
		ls ~/workspace/s3

Joy? We have S3 inside the container. The group IDE can edit S3 project. Later you can customize the IDE.
Maybe take a quick break.

5. Next: nbake web admin on port 8081 so we can ask for a build:

		cd /root/nbake

		// get latest version in the container of the source code from this git project's asrc/ :
		npm update

		//cat cofig.yaml as needed. It has the secret code to use for the web admin and where the S3 is. Defaults should be ok.

		// start node
		pm2 start ~/nbake/node_modules/nbake-admin/index.js

Now in your browser go to http://YOUR-HOST-IP:8081

You should be able to build a folder/page that you edited.

6. Other:

You can call the build yourself: http://YOUR-HOST-IP:8081/api?secret=123&folder=linkBlog&cmd=i

Pending is admin editor, something more friendly for admins, who may not like the IDE.

But: a pro would use the web IDE:
- more of a team player, no need to setup
- leverage docker
- can develop from IOS table (w/ an Apple blue toother keyboard), ChromeBook or Andorid.
- The source code stays in the cloud, not laptop that you take home.








