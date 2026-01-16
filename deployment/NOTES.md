
## Lightsail deploy

- Ubuntu (OS Only) 24 LTS
- SSH KeyPair: AccessSDKApos
- Instance Name: AccessSDKApos
- see: https://docs.apostrophecms.org/cookbook/ubuntu-hosting.html
  - use `npm run release:env` & `npm run serve:env` for deploy

### certbot: 

See:
- https://www.ssdnodes.com/blog/install-lets-encrypt-on-ubuntu-certbot-apache-and-nginx/
- https://www.server-world.info/en/note?os=Ubuntu_24.04&p=ssl&f=2
 
```
sudo apt update
sudo apt install -y certbot
sudo apt install -y python3-certbot-nginx
sudo certbot --nginx -d apos.getthirstie.com
```

- A systemd timer is setup to renew the cert. View with `systemctl list-timers`

Will display a list of all timers, e.g.

```log
...
Thu 2025-06-19 06:38:20 UTC           10h Wed 2025-06-18 06:12:19 UTC      13h ago apt-daily-upgrade.timer        apt-daily-upgrade.service
Thu 2025-06-19 08:59:01 UTC           13h Wed 2025-06-18 08:34:30 UTC      11h ago man-db.timer                   man-db.service
Thu 2025-06-19 11:41:45 UTC           15h Wed 2025-06-18 13:05:05 UTC       6h ago certbot.timer                  certbot.service
```

- view the details

```bash
ubuntu@ip-172-26-2-67:~$ systemctl cat certbot.timer
# /usr/lib/systemd/system/certbot.timer
[Unit]
Description=Run certbot twice daily

[Timer]
OnCalendar=*-*-* 00,12:00:00
RandomizedDelaySec=43200
Persistent=true

[Install]
WantedBy=timers.target
ubuntu@ip-172-26-2-67:~$ 
ubuntu@ip-172-26-2-67:~$ systemctl cat certbot.service
# /usr/lib/systemd/system/certbot.service
[Unit]
Description=Certbot
Documentation=file:///usr/share/doc/python-certbot-doc/html/index.html
Documentation=https://certbot.eff.org/docs
[Service]
Type=oneshot
ExecStart=/usr/bin/certbot -q renew --no-random-sleep-on-renew
PrivateTmp=true
ubuntu@ip-172-26-2-67:~$
```
