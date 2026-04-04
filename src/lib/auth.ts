import { cookies } from "next/headers";
import crypto from "crypto";

const TOKEN_COOKIE = "admin_token";
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function makeToken(password: string): string {
  const secret = process.env.ADMIN_PASSWORD ?? "";
  return crypto.createHmac("sha256", secret).update(password).digest("hex");
}

export function generateToken(): string {
  const secret = process.env.ADMIN_PASSWORD ?? "";
  return makeToken(secret);
}

export async function verifyAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;
  if (!token) return false;
  return token === generateToken();
}

export { TOKEN_COOKIE, TOKEN_MAX_AGE };
