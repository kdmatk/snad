export type ActivationLink = {
  token: string | null;
  type: "invite" | "recovery" | null;
};
export function parseActivationLink(hash: string): ActivationLink {
  const compact = /^#(invite|recovery)\/([a-f0-9]{40,128})$/i.exec(hash);
  if (compact)
    return {
      type: compact[1].toLowerCase() as "invite" | "recovery",
      token: compact[2],
    };
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  const type = params.get("type");
  const token = params.get("token_hash");
  return token &&
    /^[a-f0-9]{40,128}$/i.test(token) &&
    (type === "invite" || type === "recovery")
    ? { token, type }
    : { token: null, type: null };
}
