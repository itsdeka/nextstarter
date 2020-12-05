import { API, VERBS, authorization, middleware } from "./middleware";

export const users = {
  /**
   * Ottiene lo `User` attualmente autenticato.
   *
   * @remarks GET /api/users - `Protected`
   */
  get: async () => await middleware(`${API}/users`),

};

/**
 * Ottiene un `access-token` e un `refresh-token` per l'autenticazione di un utente attivato e verificato sulla piattaforma.
 *
 * ```
 * {
 *    "username": string // L'e-mail dell'utente che sta richiedendo una Token Pair
 *    "password": string // La password dell'utente
 * }
 * ```
 *
 * @remarks POST /api/token
 */
export const login = async (body) => {
  const response = await fetch(`${API}/token`, {
    method: VERBS.POST,
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response;
};

/**
 * Ottiene un nuovo `access-token` dato un `refresh-token` valido e assegnato ad un utente attivo e verificato della piattaforma.
 *
 * ```
 * {
 *    "refresh": string // Il Refresh-Token dell'utente autenticato
 * }
 * ```
 *
 * @remarks POST /api/token/refresh
 */
export const refresh = async (body) =>
  await middleware(`${API}/token/refresh`, VERBS.POST, body);

/**
 * Verifica la validità di un qualsiasi `JWT` generato nell'applicazione.
 *
 * ```
 * {
 *    "token": string // Il Token da verificare
 * }
 * ```
 *
 * @remarks POST /api/token/refresh
 */
export const verify = async (body) =>
  await middleware(`${API}/token/verify`, VERBS.POST, body);
