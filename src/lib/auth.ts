import { cookies } from "next/headers";
import crypto from "crypto";

const TOKEN_COOKIE = "admin_token";
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

export function generateToken(): string {
  const payload = crypto.randomBytes(32).toString("hex");
  const sig = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export async function verifyAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;
  if (!token) return false;

  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expected = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

export { TOKEN_COOKIE, TOKEN_MAX_AGE };
