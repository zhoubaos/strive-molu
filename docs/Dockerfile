# 基于官方Nginx镜像
FROM nginx:1.28.0-alpine

# 维护者
LABEL maintainer="zhoubaos1998@163.com"

# 清除
RUN rm -rf /usr/share/nginx/html/strive_molu_web/*

# 创建目录(如果不存在)
RUN mkdir -p /usr/share/nginx/html/strive_molu_web

# 复制静态文件
COPY ./dist /usr/share/nginx/html/strive_molu_web

# 复制配置文件
COPY ./nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动Nginx服务，使用前台运行模式
CMD [ "nginx", "-g", "daemon off;" ]