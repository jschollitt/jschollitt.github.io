import http from "http";
import url from "url";
import { add } from "./math.js";

// helper functions
function parseJSON(body) {
    try {
        return JSON.parse(body);
    } catch {
        return null;
    }
}

// Helper function to validate numbers
function validateNumbers(a, b) {
    if (typeof a !== "number" || typeof b !== "number" || isNaN(a) || isNaN(b)) {
        return false;
    }
    return true;
}

// Create server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    if ((pathname === "/add") && (method === "GET" || method === "POST")) {
        // Handle GET request
        if (method === "GET") {
            const a = parseFloat(parsedUrl.query.a);
            const b = parseFloat(parsedUrl.query.b);

            if (!validateNumbers(a, b)) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Both a and b must be numbers" }));
                return;
            }

            const result = add(a, b);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ result }));
            return;
        }

        // Handle POST request
        if (method === "POST") {
            let body = "";
            req.on("data", chunk => body += chunk);
            req.on("end", () => {
                const data = parseJSON(body);
                if (!data || !validateNumbers(data.a, data.b)) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Both a and b must be numbers" }));
                    return;
                }

                const result = add(a, b);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ result }));
            });
            return;
        }
    }

    // 404 for any other route
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});