import jwt from "jsonwebtoken"
import { findVideoIdByUser, updateStats } from '../../lib/db/hasura';
export default async function stats(req, res) {
  if(req.method === "POST") {
    try {
      const token = req.cookies.token;
      if(!token) {
        res.status(403).send({})
      } else {
        const videoId = req.query.videoId;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodedToken.issuer;
        const doesStatsExist = await findVideoIdByUser(userId, videoId);
        if(doesStatsExist) {
          // update it
          const response = await udateStats(token, {
            watched: true,
            userId,
            videoId,
            favourited: 0,
          });
          res.send({ msg: "it works", updateStats: response})
        } else {
          // add it
          const response = await udateStats(token, {
            watched: true,
            userId,
            videoId,
            favourited: 0,
          });
          res.send({ msg: "it works", updateStats: response})
        }
      }
    } catch(error) {
      console.log("Error occured /stats", error)
      res.status(500).send({ done: false, error: error?.message })
    }
  }
}