# ROADPLAY

Social Network to organize and participate to tournaments



# TODO 

- [x] Get last version in auth-service (maybe in origin/auth-service)
- [x] Connect postgres
- [x] fix python3.11/3.12 
- [x] Client for front end.
    - [x] create a client
    - [x] link to all request and pages 
- [] Protect button with modal login/signup
- [x] Nginx
- [] docker-compose 
- [] Finalize front end. 
    - [] Map => openstreetview
    - [] Sort find tournament
    - []
-





----------------------------------
nginx: 

sudo unlink /etc/nginx/sites-enabled/default
sudo ln -s /home/florian/roadplay/nginx-config.conf /etc/nginx/sites-enabled/