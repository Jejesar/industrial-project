import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //console.log(req.cookies);

  if (req.method === "POST") {
    var variables = [];

    try {
      variables = await db.tags.findMany();

      if (variables.length === 0) {
        return res.status(404).json({ message: "Variable not found" });
      }

      return res.status(200).json(variables);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
