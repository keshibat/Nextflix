import jwt from "jsonwebtoken"
import { findVideoIdByUser } from '../../lib/db/hasura';
export default async function stats(req, res) {
  if(req.method === "POST") {
    console.log({ cookies: req.cookies })
    try {
      const token = req.cookies.token;
      if(!token) {
        res.status(403).send({})
      } else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log({ decoded })

        const userId = "did:ethr:0xf6682264c8eCC53aAA341da423582D8865F14240";
        const videoId="0U0L4uT0btQ";

        const findVideoId = await findVideoIdByUser(userId, videoId);
        console.log({findVideoId})

        res.send({ msg: "it works", decoded, findVideoId})
      }
    } catch(error) {
      console.log("Error occured /stats", error)
      res.status(500).send({ done: false, error: error?.message })
    }
  }
}