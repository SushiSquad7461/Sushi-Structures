// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from "../../util/prisma";
import NextCors from 'nextjs-cors';
  

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
      // Options
      methods: ['GET'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  try {
      const teamNum = req.query["teamNum"];
      const year = req.query["year"];

      if (teamNum !== undefined && year !== undefined) {
        const parsedNum = parseInt(teamNum.toString());
        const paredYear = parseInt(year.toString());

        const ret = await prisma.configFiles.findUnique({
            where: {
                teamNum_year: {
                    teamNum: parsedNum,
                    year: paredYear
                }
            }
        });

        if (ret === undefined || ret === null) {
            res.status(400).json({ error: "Config file not found"});
        } else {
            res.status(200).json({ config: ret.configFile});
        }
      } else {
        res.status(400).json({ error: "teamNum or year not provided"});
      }
  } catch(e) {
    console.error(e);
    res.status(500).json({ error: "server error, please try again latter"});
  }
}
