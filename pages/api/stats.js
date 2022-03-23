import { findVideoIdByUser, updateStats } from '../../lib/db/hasura';
export default async function stats(req, res) {

  try {
const token = req.cookies.token;
      if(!token) {
        res.status(403).send({})
      } else {
        const inputParams = req.method === "POST" ? req.body : req.query;
        const { videoId } = inputParams;
        if (videoId) {
          const userId = verifyToken(token);
          const findVideo = await findVideoIdByUser(
            token,
            userId,
            videoId
          );
          const doesStatsExist = findVideo?.length > 0;
          if(req.method === "POST") {
            const { favourited, watched = true } = req.body;
            if(doesStatsExist) {
            // update it
            const response = await udateStats(token, {
              watched,
              userId,
              videoId,
              favourited,
            });
            res.send({ data: response} )
          } else {
            // add it
            const response = await udateStats(token, {
              watched,
              userId,
              videoId,
              favourited,
            });
            res.send({ data: response })
        }

          } else {
            if(doesStatsExist) {
            res.send(findVideo)
          } else {
            // add it
            res.status(404);
            res.send({ user: null,  msg: "Video not found" })
        }
          }
        }
      }
  } catch(error) {
      console.log("Error occured /stats", error)
      res.status(500).send({ done: false, error: error?.message })
    }
}