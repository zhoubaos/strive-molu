#!/bin/bash

# 打包
NODE_ENV=production vitepress build

# 复制Dockerfile
cp Dockerfile ./build/Dockerfile

# 复制nginx配置文件
cp nginx.conf ./build/nginx.conf
