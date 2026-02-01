import http from 'http';

const PORT = 3000;

const PROMPTS = [
    {
        id: '1',
        name: 'React Component',
        content: 'Create a React component with the following specifications:\n\n',
        category: 'Code'
    },
    {
        id: '2',
        name: 'SQL Query',
        content: 'Write a SQL query to select all users who:\n\n',
        category: 'Database'
    }
];

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'GET' && req.url === '/api/prompts') {
        // Verify Authorization header if present
        const auth = req.headers.authorization;
        if (auth && auth.startsWith('Bearer ')) {
            console.log('Authorized request');
        } else {
            console.log('Unauthorized request (simulated warning)');
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(PROMPTS));
        return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, () => {
    console.log(`Mock API server running at http://localhost:${PORT}`);
});
