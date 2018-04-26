# nbake web admin

For webmasters, install this to admin and build your S3 & markup(Pug) based webapp.  It also lets you continously build the pug on your S3 hosted webapp.

IMPORTANT: While webmaster is the one to install this, the user is: a tech manager or admin.

- http://hub.docker.com/r/nbake/nbake


![Image of IDE ]( https://raw.githubusercontent.com/topseed/nbake-admin/master/ide.PNG )


If you know how to install LAMP, then a webmaster should be able to do this docker based install.
If you don't want to set this up by self, at the bottom of this doc, there are commercial vendors that will setup it for you, cheap and on demand.
It has to be setup, since it needs to point to your S3 bucket.

Pre-requsites:
Beforehand, you should have S3 host, key, secret and bucket-name and tested
the password works. Ex: Upload a sample webapp via CyberDuck (FTP) - before you start the admin install. And you should be able to access your website from a browser.
Check http://github.com/topseed/nbake-user first. Let it soak a day. ie, don't try to get the admin docker working if you just got S3 website working, take a break.


Benfits of admin:
- The source code stays in the cloud, not laptop that admins or developers take home.
- Cool factor: you can develop from ChromBook, IOS Tablet (w/ Apple Bluetooth keyboard) or Andorid tablet.
- There is no local development enivorment, client less development added to your servless hosting.
- Team player, you set up docker for your entire team.


The Docker host should be very close to your admin team due to IDE keystroke latency, the closer the better. Also, it is recommended to have more than one Docker Host. For example in NYC and LA if you have two teams in those 2 cities; or one for sport-section and one for other parts of webapp. Also, each project, domain, subdomain should have one 'nbake Docker' instance.
It is not recommneded to run Docker locally on PC|Mac, or to have one 'Docker host' per developer: Web Admin is multi user, it supports mutiple admins. Separate, if you get stuck, you may need
someone to help you with your Docker image via remote SSH - so keep that in mind, maybe chose your DMZ or in your Cloud VPN.

### Setup
- http://github.com/topseed/nbake-admin/blob/master/SETUP.md

You can later add IDE plugins from here:
- http://market.codiad.com

You can  optionally call the build via API: http://YOUR-HOST-IP:8081/api?secret=123&folder=linkBlog&cmd=i

Pending is admin editor, something more friendly for admins, who may not like the IDE.

Commercial support, hosting, training, plugins and consulting are provided by:
- http://narwhalstar.com
or
- http://wordpug.com

Note that this is Apache license, and you to could/should consider supporting it.




