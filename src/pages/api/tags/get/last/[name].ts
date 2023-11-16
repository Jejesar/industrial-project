import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    var lastVariable = null;

    const { name } = req.query;

    try {
      lastVariable = await db.tags.findFirst({
        where: {
          name: name as string,
        },
        orderBy: {
          date: "desc",
        },
      });

      return res.status(200).json(lastVariable);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
