import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { name, description, type, image, email } = req.body;
  const password = generatePassword();
  const result = await prisma.app.create({
    data: {
      name,
      description,
      type,
      image,
      author: { connect: { email } },
      password,
    },
  });
  res.json(result);
}

const generatePassword = () => {
  return Math.random().toString(36).slice(-8);
};
