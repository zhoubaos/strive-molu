#!/bin/bash

DOCKERFILE_DIR='/www/strive_molu_web'

cd $DOCKERFILE_DIR

#构建镜像
docker build -t strive-molu-docs:latest .

# 删除悬空镜像
docker image prune -f

# 检查容器是否存在，存在则删除
if [ "$(docker ps -aq -f name=^/strive-molu-docs$)" ]; then
  docker rm -f strive-molu-docs
fi

#启动容器
docker run -d -p 80:80 --name strive-molu-docs strive-molu-docs:latest