/**
 * API utility for communicating with the FastAPI backend.
 */

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const INTERNAL_API_URL = process.env.INTERNAL_API_URL || PUBLIC_API_URL;

/**
 * Determine the correct API base URL depending on environment.
 * Server components use the internal Docker network URL.
 * Client components use the public URL.
 */
function getBaseUrl(): string {
  if (typeof window === "undefined") {
    // Server-side: use internal Docker URL
    return INTERNAL_API_URL;
  }
  // Client-side: use public URL
  return PUBLIC_API_URL;
}

/**
 * Fetch data from a public API endpoint.
 */
export async function fetchPublic<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${getBaseUrl()}/api/public${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Fetch data from an admin API endpoint (requires JWT token).
 */
export async function fetchAdmin<T>(path: string, token: string, options?: RequestInit): Promise<T> {
  const url = `${getBaseUrl()}/api/admin${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Admin API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Login and get JWT token.
 */
export async function loginAdmin(email: string, password: string): Promise<{ access_token: string; token_type: string }> {
  const url = `${getBaseUrl()}/api/auth/login`;
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return res.json();
}
