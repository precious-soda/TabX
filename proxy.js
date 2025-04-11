import express from "express";
import httpProxy from "http-proxy";
import url from "url";
import cors from "cors";

const app = express();
const proxy = httpProxy.createProxyServer({ changeOrigin: true });

app.use(cors());

app.use((req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl || !/^https?:\/\//i.test(targetUrl)) {
    return res.status(400).send("Invalid or missing target URL.");
  }

  try {
    const parsedUrl = new URL(targetUrl);
    proxy.web(req, res, { target: parsedUrl.origin + parsedUrl.pathname });
  } catch (err) {
    console.error("Invalid URL error:", err);
    res.status(400).send("Invalid URL");
  }
});

proxy.on("proxyRes", (proxyRes, req, res) => {
  delete proxyRes.headers["x-frame-options"];
  delete proxyRes.headers["content-security-policy"];
  delete proxyRes.headers["content-security-policy-report-only"];
  delete proxyRes.headers["strict-transport-security"];
  delete proxyRes.headers["referrer-policy"];
  proxyRes.headers["content-security-policy"] = "";
});

proxy.on("error", (err, req, res) => {
  console.error("Proxy error:", err);
  res.writeHead(500, { "Content-Type": "text/plain" });
  res.end("Proxy server error.");
});

const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Proxy server running at http://localhost:${PORT}`));
