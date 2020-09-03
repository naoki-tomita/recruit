import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch(req.method.toLowerCase()) {
    case "post":
      return res.status(201).json(await get(req.body));
  }
}

async function get(req: NextApiRequest) {
  await axios.get("/v1/auth/me", { headers: { cookie: req.cookies } });
}
