export const IS_DEVELOPMENT =
  import.meta.env.DEV ||
  import.meta.env.NODE_ENV === "development";

export const CLIENT_URL =
  IS_DEVELOPMENT
    ? "http://localhost:3333"
    : "https://finni.vercel.app/";

export const SERVER_URL = `${CLIENT_URL}/api`
