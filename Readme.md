# ROADPLAY

Social Network to organize and participate to tournaments



# TO START: 

open many terminals: 
-  sudo systemctl reload nginx
- python3.11 -m uvicorn core.tournaments_manager.app:app --reload --port 8001
- python3 -m uvicorn auth.main:app --reload --port 8002
- cd ./client/ && npm run dev 


# TODO 

- [ ] Protect button with modal login/signup
- [ ] docker-compose 
- [ ] Map => openstreetview
- [x] Refacto Find tournament
- [ ] Age as interval number
- [ ] Image on server (todo on Google)
- [ ] Participate to tournament page
-





----------------------------------
nginx: 

sudo unlink /etc/nginx/sites-enabled/default
sudo ln -s /home/florian/roadplay/nginx-config.conf /etc/nginx/sites-enabled/
