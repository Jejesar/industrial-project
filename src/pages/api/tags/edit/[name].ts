import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name } = req.query;

    try {
      await db.tags.update({
        where: {
          name: name as string,
        },
        data: {
          show: req.body.show,
        },
      });

      return res.status(200).json({ message: "Variable updated" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
