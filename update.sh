#!/bin/bash

systemctl stop migo
sleep 5
git pull
sleep 5
systemctl start migo
