export function extractKeycloakRoles(accessToken: string, clientId: string) {
  try {
    const payload = JSON.parse(
      Buffer.from(accessToken.split(".")[1], "base64url").toString("utf-8")
    );

    const realmRoles: string[] = payload?.realm_access?.roles ?? [];
    const clientRoles: string[] = payload?.resource_access?.[clientId]?.roles ?? [];

    // normalize to "AUTHOR"/"ADMIN" etc
    return Array.from(new Set([...realmRoles, ...clientRoles]));
  } catch {
    return [];
  }
}
