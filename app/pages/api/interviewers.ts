import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch(req.method.toLowerCase()) {
    case "post":
      return res.status(201).json(await post(req.body));
  }
}

async function post(body: { name: string, password: string }) {
  return axios.post("/v1/auth/create", body);
}
