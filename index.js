const allowedIps = ['127.0.0.1']; // 替换为您允许的 IP 地址
const validKey = 'your_secret_key'; // 替换为您允许的密钥

const enableIps = false;
const enableKey = true;

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({
            success: false,
            error: "Only POST method is allowed"
        }), {status: 405});
    }

    let requestData;
    try {
        requestData = await request.json();
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: "Invalid JSON"
        }), {status: 400});
    }

    const { key, url: originUrl } = requestData;

    if (enableKey) {
        if (validKey === 'your_secret_key') {
            return new Response(JSON.stringify({
                success: false,
                error: "Please set a valid key"
            }), {status: 403});
        }
        if (key !== validKey) {
            return new Response(JSON.stringify({
                success: false,
                error: "Unauthorized key"
            }), {status: 403});
        }
    }

    if (enableIps) {
        // 获取请求 IP 地址
        const requestIp = request.headers.get('cf-connecting-ip');
        if (!allowedIps.includes(requestIp)) {
            return new Response(JSON.stringify({
                success: false,
                error: "Unauthorized IP"
            }), {status: 403});
        }
    }

    if (!originUrl) {
        return new Response(JSON.stringify({
            success: false,
            error: "URL not provided"
        }), {status: 400});
    }

    try {
        // 发起请求
        const response = await fetch(originUrl);

        if (!response.ok) {
            return new Response(JSON.stringify({
                success: false,
                error: "Failed to fetch resource"
            }), {status: 502});
        }

        const newHeaders = new Headers(response.headers);
        // 添加 CORS 头部
        newHeaders.set('Access-Control-Allow-Origin', '*');

        // 返回
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders
        });
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: "Error fetching resource"
        }), {status: 500});
    }
}
