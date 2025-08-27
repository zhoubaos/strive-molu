#!/bin/bash

# 部署dist文件夹到服务器
# 颜色输出函数
info() {
  echo -e "\033[1;34m💡 $1\033[0m"
}

success() {
  echo -e "\033[1;32m✅ $1\033[0m"
}

warning() {
  echo -e "\033[1;33m⚠️  $1\033[0m"
}

error() {
  echo -e "\033[1;31m❌ $1\033[0m"
  exit 1
}
# 定义服务器变量
SERVER="root@115.159.56.226"
PORT="22"

CLIENT_DIR="${PWD}/build" # 源目录
SERVER_DIR="/www/strive_molu_web"
UPLOAD_DIR="$SERVER_DIR/upload_dist" # 服务器上传目录 WARN：更改需同步更改线上部署脚本配置
DEPLOY_SCRIPT_URL="$SERVER_DIR/deploy.sh" # 服务器部署脚本
BACK_SCRIPT_URL="$SERVER_DIR/back.sh" # 服务器回退脚本
DOCKER_SCRIPT_URL="$SERVER_DIR/docker.sh" # docker容器启动脚本

# 显示帮助信息
show_help() {
    echo "用法: $0 [选项]"
    echo "选项:"
    echo "  -o <操作 deploy|back>  显示此帮助信息"
    echo "  --help             显示此帮助信息"
    exit 0
}

# 解析参数
OPERATE="deploy" # 操作 deploy发布 | back 回退上个版本
while [[ $# -gt 0 ]]; do
  case "$1" in
    -o)
      OPERATE="$2"
      shift 2
      ;;
    -h|--help)
      show_help
      ;;
    *)
      error "错误: 未知参数 '$1'"
      show_help
      ;;
  esac
done

# 验证操作
if [ "$OPERATE" != "deploy" ] && [ "$OPERATE" != "back" ]; then
  error "错误: 未知操作 '$OPERATE'"
  show_help
fi

info "操作：$OPERATE";
info "服务器地址: $SERVER"

# 打包
if [ "$OPERATE" = "deploy" ]; then
  info "打包中..."
  npm run build >/dev/null 2>&1 || error "打包失败！"
  success "打包成功！"
fi

# 执行脚本
if [ "$OPERATE" = "deploy" ]; then
  info "文件上传中..."
  # 上传dist文件夹
  rsync -e "ssh -p $PORT" -avzq --delete "$CLIENT_DIR/dist/" $SERVER:$UPLOAD_DIR || error "dist上传失败！";
  # 上传Dockerfile和nginx.conf
  rsync -e "ssh -p $PORT" -av "$CLIENT_DIR/Dockerfile" "$CLIENT_DIR/nginx.conf" $SERVER:$SERVER_DIR/ || error "Dockerfile上传失败！";
  success "文件上传成功！"

  info "执行部署脚本..."
  ssh -p $PORT -o ConnectTimeout=6 "$SERVER" "bash $DEPLOY_SCRIPT_URL > /dev/null && bash $DOCKER_SCRIPT_URL > /dev/null" || error "部署脚本执行失败！";
  success "执行完成！"

elif [ "$OPERATE" = "back" ]; then 
  info "回退中..."
  ssh -o ConnectTimeout=10 "$SERVER" "bash $BACK_SCRIPT_URL >/dev/null && bash $DOCKER_SCRIPT_URL >/dev/null" || error "回退脚本执行失败！";
  success "回退完成！"
fi

