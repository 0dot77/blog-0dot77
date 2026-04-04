const GITHUB_API = "https://api.github.com";

function getConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  if (!token || !repo) throw new Error("GITHUB_TOKEN and GITHUB_REPO are required");
  return { token, repo };
}

function headers() {
  const { token } = getConfig();
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };
}

async function getFileSha(filePath: string): Promise<string | null> {
  const { repo } = getConfig();
  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${filePath}`, {
    headers: headers(),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.sha;
}

export async function createOrUpdateFile(
  filePath: string,
  content: string,
  message: string,
): Promise<void> {
  const { repo } = getConfig();
  const sha = await getFileSha(filePath);
  const body: Record<string, string> = {
    message,
    content: Buffer.from(content).toString("base64"),
  };
  if (sha) body.sha = sha;

  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${filePath}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API error: ${res.status} ${err}`);
  }
}

export async function deleteFile(filePath: string, message: string): Promise<void> {
  const { repo } = getConfig();
  const sha = await getFileSha(filePath);
  if (!sha) throw new Error("File not found on GitHub");

  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${filePath}`, {
    method: "DELETE",
    headers: headers(),
    body: JSON.stringify({ message, sha }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API error: ${res.status} ${err}`);
  }
}

export async function listFiles(dirPath: string): Promise<{ name: string; path: string }[]> {
  const { repo } = getConfig();
  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${dirPath}`, {
    headers: headers(),
  });
  if (!res.ok) return [];
  const data = await res.json();
  if (!Array.isArray(data)) return [];
  return data
    .filter((f: { type: string; name: string }) => f.type === "file")
    .map((f: { name: string; path: string }) => ({ name: f.name, path: f.path }));
}

export async function getFileContent(filePath: string): Promise<string | null> {
  const { repo } = getConfig();
  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${filePath}`, {
    headers: headers(),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return Buffer.from(data.content, "base64").toString("utf-8");
}

export async function uploadImage(
  fileName: string,
  base64Data: string,
  message: string,
): Promise<string> {
  const filePath = `public/blog/images/${fileName}`;
  const { repo } = getConfig();
  const sha = await getFileSha(filePath);
  const body: Record<string, string> = {
    message,
    content: base64Data,
  };
  if (sha) body.sha = sha;

  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${filePath}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API error: ${res.status} ${err}`);
  }

  // Return raw GitHub URL so the image is available immediately (before next deploy)
  return `https://raw.githubusercontent.com/${repo}/main/${filePath}`;
}
