export const IS_DEVELOPMENT =
  process.env.REACT_APP_VERCEL_ENV === "development" ||
  process.env.REACT_APP_ENVIRONMENT === "development" ||
  process.env.NODE_ENV === "development";

export const CLIENT_URL =
  IS_DEVELOPMENT
    ? "http://localhost:3333"
    : "https://finni.vercel.app/";

export const SERVER_URL = `${CLIENT_URL}/api`
