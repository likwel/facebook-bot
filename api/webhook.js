import { ENV } from "../config/env.js";
import { getResponse } from "../lib/keywords.js";
import { sendMessage } from "../lib/facebook.js";

export default async function handler(req, res) {

  // ───── VERIFY WEBHOOK ─────
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token === ENV.VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }

    return res.sendStatus(403);
  }

  // ───── RECEIVE EVENTS ─────
  if (req.method === "POST") {
    const body = req.body;

    try {
      for (const entry of body.entry || []) {
        for (const change of entry.changes || []) {

          const message = change.value.message;
          const userId = change.value.from?.id;

          if (!message || !userId) continue;

          const response = getResponse(message);

          if (response) {
            await sendMessage(userId, response);
          }
        }
      }

      return res.status(200).send("EVENT_RECEIVED");
    } catch (err) {
      console.error(err);
      return res.status(500).send("ERROR");
    }
  }

  return res.sendStatus(405);
}