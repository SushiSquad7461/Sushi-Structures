// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { genSalt, hash } from "bcryptjs";
import {prisma} from "../../util/prisma";
import { isInt16Array } from 'util/types';
import makeid from '../../util/randomString';
import { ConfigFile } from '../../util/configfile';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const { config } = req.body;
      console.log("in");

      if (config !== undefined) {
        console.log(config!.toString());
          const parsedConfig = JSON.parse(config!.toString()) as ConfigFile;
          console.log("why");

          const ret = await prisma.configFiles.upsert({
              where: {
                  teamNum_year: {
                      teamNum: parsedConfig.teamNumber,
                      year: parsedConfig.year,
                  }
              },
              create: {
                  teamNum: parsedConfig.teamNumber,
                  year: parsedConfig.year,
                  configFile: config.toString()
              }, update: {
                  configFile: config.toString()
              }
          });
          
          console.log(ret);

          res.status(200).json({ error: ""});
      } else {
          res.status(400).json({ error: "config file not sent"});
      }
    } else {
      res.status(400).json({ error: "Only POST request accepted"});
    }
  } catch(e) {
    console.error(e);
    res.status(500).json({ error: "server error, please try again latter", extra: e});
  }
}
