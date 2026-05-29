import express from 'express';
import axios from 'axios';

const app = express();

const API_URL = 'https://sandbox.crmcarecloud.com/webservice/rest-api/customer-interface/v1.0';

// Povolené originy
const allowedOrigins = [
    /^http:\/\/localhost(:\d+)?$/,
    /^http:\/\/127\.0\.0\.1(:\d+)?$/,
    /^http:\/\/192\.168\.\d+\.\d+(:\d+)?$/, // lokální síť
    /^https:\/\/example\.com$/,
];

app.use(express.raw({ type: '*/*' }));

app.use(async (req, res) => {
    const origin = req.headers.origin;

    // Kontrola originu
    if (
        origin &&
        !allowedOrigins.some(pattern => pattern.test(origin))
    ) {
        return res.status(403).json({
            error: 'Forbidden',
        });
    }

    // CORS odpověď
    if (origin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization, X-External-App-Id, X-Auth-Token'
        );
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, PATCH, DELETE, OPTIONS'
        );
    }

    // Preflight
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    const headers = { ...req.headers };
    delete headers.host;
    delete headers.origin;
    delete headers.referer;
    delete headers['content-length'];

    const targetUrl = `${API_URL}${req.originalUrl}`;

    try {
        const response = await axios({
            method: req.method,
            url: targetUrl,
            headers: {
                ...req.headers,
                host: 'sandbox.crmcarecloud.com',
                origin: undefined,
                referer: undefined
            },
            data: req.body,
            responseType: 'stream',
            validateStatus: () => true,
        });

        res.status(response.status);

        Object.entries(response.headers).forEach(([key, value]) => {
            if (value) {
                res.setHeader(key, value);
            }
        });

        response.data.pipe(res);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Proxy failed',
        });
    }
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Proxy běží na http://0.0.0.0:3000');
});