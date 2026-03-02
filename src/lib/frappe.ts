export const FRAPPE_URL = process.env.NEXT_PUBLIC_FRAPPE_URL || "https://uat-demo.fateherp.com";
const API_KEY = process.env.FRAPPE_API_KEY;
const API_SECRET = process.env.FRAPPE_API_SECRET;

const headers = {
    "Content-Type": "application/json",
    "Authorization": `token ${API_KEY}:${API_SECRET}`,
};

export async function fetchFrappe(endpoint: string, options: RequestInit = {}) {
    const url = `${FRAPPE_URL}/api${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            ...headers,
            ...options.headers,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Frappe API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return data.data || data.message || data;
}

// Helper to get a list of documents
export async function getList(doctype: string, fields: string[] = ['*'], filters: any[] = [], limit: number = 20) {
    const queryParams = new URLSearchParams({
        fields: JSON.stringify(fields),
        filters: JSON.stringify(filters),
        limit_page_length: limit.toString()
    });

    return fetchFrappe(`/resource/${doctype}?${queryParams.toString()}`);
}

// Helper to get a single document
export async function getDoc(doctype: string, name: string) {
    return fetchFrappe(`/resource/${doctype}/${name}`);
}

// Helper to create a document
export async function createDoc(doctype: string, doc: any) {
    return fetchFrappe(`/resource/${doctype}`, {
        method: 'POST',
        body: JSON.stringify(doc)
    });
}

// Helper to update a document
export async function updateDoc(doctype: string, name: string, doc: any) {
    return fetchFrappe(`/resource/${doctype}/${name}`, {
        method: 'PUT',
        body: JSON.stringify(doc)
    });
}
