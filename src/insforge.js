import { createClient } from "@insforge/sdk";

const baseUrl = process.env.REACT_APP_INSFORGE_URL;
const anonKey = process.env.REACT_APP_INSFORGE_KEY;

if (!baseUrl) {
  // eslint-disable-next-line no-console
  console.warn("Missing REACT_APP_INSFORGE_URL env var.");
}
if (!anonKey) {
  // eslint-disable-next-line no-console
  console.warn("Missing REACT_APP_INSFORGE_KEY env var.");
}

export const insforge = createClient({
  baseUrl,
  // Using INSFORGE_KEY as anonKey for browser client (public auth/session usage).
  anonKey,
});
