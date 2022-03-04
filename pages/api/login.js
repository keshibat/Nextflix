import { magicAdmin } from "../../lib/magic"
import jwt from "jsonwebtoken"

export default async function login(req, res) {
    if(req.method === "POST") {
      try {
        const auth = req.headers.authorization;
        const didToken = auth ? auth.substr(7) : "";

        //invoke magic
        const { issuer } = await magicAdmin.users.getMetadataByToken(didToken);
        console.log(issuer);

        // create jwt
        const token = jwt.sign({
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": `${issuer}`,
          },
        },
        "process.env.JWT_SECRET"
        );
        console.log("abc", { token });
        res.send({ done: true });

      } catch(error) {
        console.error("Something went wrong loggin in", {error})
        res.status(500).send({ done: false });
      }
    } else {
      res.send({ done: false });
    }
}