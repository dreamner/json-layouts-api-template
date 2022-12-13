import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { name, description, type, image, email } = req.body;
  const result = await prisma.app.create({
    data: {
      name,
      description,
      type,
      image,
      author: { connect: { email } },
    },
  });
  res.json(result);
}
