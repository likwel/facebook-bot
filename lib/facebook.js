import { ENV } from "../config/env.js";

export async function sendMessage(userId, text) {
  return await fetch(
    `${ENV.BASE_URL}/me/messages?access_token=${ENV.PAGE_TOKEN}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        recipient: { id: userId },
        message: { text }
      })
    }
  );
}