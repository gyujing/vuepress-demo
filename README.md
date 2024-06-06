vuepress V1 学习

## 安装依赖和构建
1. 先node14，npm install   =>filber失败
2. 切换node10，npm install fibers@4.0.3 --build-from-source
3. 切回node14，npm install
4. 构建 npm run build

## 安装依赖
> 删除node_modules
> 删除package_lock.json
> npm cache clean --force

## 本地项目如何使用本地组件库依赖
1. 用管理员权限，在vuepress-ui组件库根目录下，npm link
2. 在本地项目的目录下， 
	-npm link vuepress-ui
3. 删除vuepress-ui的link，
	- npm remove @vuepress-ui -g
