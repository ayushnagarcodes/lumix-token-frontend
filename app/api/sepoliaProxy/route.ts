import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const ALCHEMY_URL = `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

  try {
    const body = await req.json(); // Get JSON request from client

    const response = await fetch(ALCHEMY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body), // Forward request payload
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: response.status });
  } catch (error) {
    return new Response(JSON.stringify({ error: "RPC request failed" }), {
      status: 500,
    });
  }
}
