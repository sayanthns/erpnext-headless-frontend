import { NextResponse } from 'next/server';

const FRAPPE_URL = process.env.NEXT_PUBLIC_FRAPPE_URL;
const API_KEY = process.env.FRAPPE_API_KEY;
const API_SECRET = process.env.FRAPPE_API_SECRET;

const headers = {
    "Content-Type": "application/json",
    "Authorization": `token ${API_KEY}:${API_SECRET}`,
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');

    if (!endpoint) return NextResponse.json({ error: "Missing endpoint" }, { status: 400 });

    const frappeParams = new URLSearchParams(searchParams);
    frappeParams.delete('endpoint');

    try {
        const res = await fetch(`${FRAPPE_URL}/api/${endpoint}?${frappeParams.toString()}`, { headers });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        return NextResponse.json({ error: "Proxy Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');

    if (!endpoint) return NextResponse.json({ error: "Missing endpoint" }, { status: 400 });

    try {
        const body = await request.json();
        const res = await fetch(`${FRAPPE_URL}/api/${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        return NextResponse.json({ error: "Proxy POST Error" }, { status: 500 });
    }
}
