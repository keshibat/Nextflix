export default async function login(req, res) {
    if(req.method === "POST") {
      try {
        const auth = req.headers.authorization;
        const token = auth ? auth.substr(7) : "";
        console.log({token});
        console.log({auth});
        res.send({ done: true });
      } catch {
        console.error("Something went wrong loggin in")
        res.status(500).send({ done: false });
      }
    } else {
      res.send({ done: false });
    }
}