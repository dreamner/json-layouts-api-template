import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { name, description, type, image } = req.body;
  const session = await getSession({ req });
  const result = await prisma.app.create({
    data: {
      name,
      description,
      type,
      image,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
