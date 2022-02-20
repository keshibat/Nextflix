import { magicAdmin } from "../../lib/magic"
import jwt from "jsonwebtoken"

export default async function login(req, res) {
    if(req.method === "POST") {
      try {
        const auth = req.headers.authorization;
        const didToken = auth ? auth.substr(7) : "";
        //invoke magic

        const metadata = await magicAdmin.users.getMetadataByToken(didToken);
        console.log({ metadata });
        res.send({ done: true });

        // create jwt
        const token = jwt.sign({
            ...metadata,
            iat: Math.floor(Date.now() /1000),
            exp: Math.floor(Date.now() /1000 +7 *24 * 60 * 60),
            "https://hasura.io/jwt/claims": {
              "x-hasura-allowed-roles": ["user", "admin"],
              "x-hasura-default-role": "user",
              "x-hasura-user-id": `${metadata.issuer}`,
            },
        },
        "abcdeabcdeabcdeabcdeabcdeabcdeabc"
        );
        console.log({ token });

      } catch {
        console.error("Something went wrong loggin in")
        res.status(500).send({ done: false });
      }
    } else {
      res.send({ done: false });
    }
}