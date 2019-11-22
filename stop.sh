#!/usr/bin/env bash
echo -e $"Tear down the stack"
docker stack rm talk
echo -e $"Finish"