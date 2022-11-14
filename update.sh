#!/bin/bash

systemctl stop migo
sleep 1000
git pull
sleep 1000
systemctl start migo
