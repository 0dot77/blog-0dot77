import { cookies } from "next/headers";
import crypto from "crypto";

const TOKEN_COOKIE = "admin_token";
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// In-memory store — resets on server restart (forces re-login)
const validTokens = new Set<string>();

export function storeToken(token: string): void {
  validTokens.add(hashToken(token));
}

export async function verifyAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;
  if (!token) return false;
  return validTokens.has(hashToken(token));
}

export { TOKEN_COOKIE, TOKEN_MAX_AGE };
