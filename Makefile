#!/bin/bash
.PHONY: default

setup:
	docker-compose build

start:
	docker-compose up

stop: 
	docker-compose stop

clear:
	sudo rm -rf /app/node_modules
	sudo rm -rf /app/node_modules
