import { magicAdmin } from "../../lib/magic"

export default async function login(req, res) {
    if(req.method === "POST") {
      try {
        const auth = req.headers.authorization;
        const didToken = auth ? auth.substr(7) : "";
        res.send({ didToken });

        const metadata = await magicAdmin.users.getMetadataByToken(didToken);
        console.log({ metadata });
      } catch {
        console.error("Something went wrong loggin in")
        res.status(500).send({ done: false });
      }
    } else {
      res.send({ done: false });
    }
}