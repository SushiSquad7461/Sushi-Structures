// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { genSalt, hash } from "bcryptjs";
import {prisma} from "../../util/prisma";
import { isInt16Array } from 'util/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const { num, pass } = req.body;

      if (!(/^[0-9]+$/.test(num))) {
        res.status(400).json({ error: "Team num is not a number"});
        return;
      }

      const parsedNum = parseInt(num);


      const found = await prisma.users.findUnique({
        where: {
          teamNum: parsedNum,
        }
      });

      if (found !== null) {
        res.status(400).json({ error: "Team num already in use"});
      } else {
        const salt = await genSalt();
        const hashRes = await hash(pass, salt);

        await prisma.users.create({
          data: {
            teamNum: parsedNum,
            password: hashRes,
          }
        });

        res.status(200).json({ error: "" });
      }
    } else {
      res.status(400).json({ error: "Method is POST only" })
    }
  } catch(e) {
    console.error(e);
    res.status(500).json({ error: "server error, please try again latter"});
  }
}
