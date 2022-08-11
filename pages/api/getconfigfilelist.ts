// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from "../../util/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
      const teamNum = req.query["teamNum"];

      if (teamNum !== undefined) {
        const parsedNum = parseInt(teamNum.toString());

        const list = await prisma.configFiles.findMany({
            where: {
                teamNum: parsedNum,
            }
        });

        const retList = [];

        for (let i=0; i < list.length; ++i) {
            retList.push(list[i].year);
        }

        res.status(200).json({ list: JSON.stringify(retList) });
      } else {
        res.status(400).json({ error: "teamNum not provided"});
      }
      
   
  } catch(e) {
    console.error(e);
    res.status(500).json({ error: "server error, please try again latter"});
  }
}
