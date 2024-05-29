# 部署 教程

## 前提条件

- 一个已注册的 Cloudflare 账户
- 一个绑定到该账户的域名（域名地址可能会被公开，所以最好用`干净`的域名）

## 步骤

### 1. 登录 Cloudflare 账户

首先，登录到您的 Cloudflare 账户。

### 2. 进入 Workers 面板

在左侧导航栏中，找到并点击 **Workers 和 Pages**。

### 3. 创建一个新 Worker

1. 点击 **创建应用程序** 按钮。
2. 点击 **创建 Worker** 按钮。
3. 编辑worker名称，点击部署。
4. 出现部署成功界面后，点击编辑代码

### 4. 编辑 Worker 代码

1. 在 Worker 编辑器中，填入index.js文件的代码

2. 根据您的需求，替换 `allowedIps` 和 `validKey` 的值。

### 5. 保存并部署

1. 点击 **部署** 按钮，保存并部署您的 Worker。

### 6.绑定域名

1. 点击 **设置** 按钮，选择 **触发器** 栏目，点击**添加自定义域**
2. 输入你要绑定的域名，例如new-api-worker.yourdomain.com
3. 等待域名生效，并测试

### 7.删除访问者 IP 标头

1. 进入你绑定到该worker的域名，点击 **规则** ， **转换规则** ，打开 **删除访问者 IP 标头** 选择，如下图
<img width="1162" alt="image" src="https://github.com/Calcium-Ion/new-api-worker/assets/61247483/7adbf5e4-1190-4556-b971-9856b39a342e">

### 8. 测试您的 Worker

您可以通过发送 POST 请求到您的 Worker URL（例如：`https://new-api-worker.yourdomain.com`）来测试它。确保请求中包含正确的密钥和URL。

### 示例请求

```bash
curl -X POST https://new-api-worker.yourdomain.com \
-H "Content-Type: application/json" \
-d '{"key":"your_secret_key", "url":"https://example.com"}'
```

### 注意事项

- 请确保在 Cloudflare 的防火墙规则中正确配置 IP 访问控制。
- 根据您的需求启用或禁用 IP 验证和密钥验证。
