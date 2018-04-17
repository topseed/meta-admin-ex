# admin

Install this to admin, api, manage, etc your S3 website.


gpl3

only cloud linux supported

install goofYs first, and mount your S3

install node

npm i nbake-admin

configure yaml to the mounted folder, ex config.yaml here

npm install pm2 -g

pm2 start ~/node_modules/nbake-admin/index.js


test api with

http://165.227.195.79:3000/api?secret=123&folder=linkBlog&cmd=i


