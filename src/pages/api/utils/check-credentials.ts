import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import { Credentials } from "~/assets/types";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const credentials: Credentials = req.body;
    var user = null;
    try {
      user = await db.user.findUnique({
        where: {
          name: credentials.username,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }

    if (user && user.password === credentials.password) {
      return res.status(200).json({
        id: user.id,
        name: user.name,
        role: user.role,
      });
    }
    return res.status(401).json({ message: "Invalid credentials" });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
