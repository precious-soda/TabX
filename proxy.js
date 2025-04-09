import express from "express";
import httpProxy from "http-proxy";

const app = express();
const proxy = httpProxy.createProxyServer();

// Proxy all requests to the target service
app.use((req, res) => {
  const targetUrl = req.query.url || "http://localhost:3000"; // Default to localhost:3000 if no URL is provided
  proxy.web(req, res, { target: targetUrl }, (err) => {
    if (err) {
      console.error("Proxy error:", err);
      res.status(500).send("Proxy error");
    }
  });
});

// Remove X-Frame-Options from the response
proxy.on("proxyRes", (proxyRes) => {
  delete proxyRes.headers["x-frame-options"];
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));