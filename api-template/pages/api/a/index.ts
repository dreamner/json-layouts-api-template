import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const apps = await prisma.app.findMany({
    where: { published: true },
  });
  res.json(apps);
}
