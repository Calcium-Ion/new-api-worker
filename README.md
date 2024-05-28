# 部署 教程

## 前提条件

- 一个已注册的 Cloudflare 账户

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

### 6. 测试您的 Worker

您可以通过发送 POST 请求到您的 Worker URL（例如：`https://your-subdomain.workers.dev`）来测试它。确保请求中包含正确的密钥和URL。

### 示例请求

```bash
curl -X POST https://your-subdomain.workers.dev \
-H "Content-Type: application/json" \
-d '{"key":"your_secret_key", "url":"https://example.com"}'
```

### 注意事项

- 请确保在 Cloudflare 的防火墙规则中正确配置 IP 访问控制。
- 根据您的需求启用或禁用 IP 验证和密钥验证。
