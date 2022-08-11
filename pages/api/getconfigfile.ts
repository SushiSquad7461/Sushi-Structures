// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from "../../util/prisma";
import Cors from 'cors';

const cors = Cors({
    methods: [ 'GET'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function
  ) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }
  

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

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
