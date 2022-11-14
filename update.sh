#!/bin/bash

systemctl stop migo
sleep 1
git pull
sleep 1
npm install
sleep 1
chmod +x index.js
sleep 1
systemctl start migo
