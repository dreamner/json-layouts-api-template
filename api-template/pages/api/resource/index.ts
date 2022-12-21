import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { name, description, tag, appId } = req.body;
  const result = await prisma.resourceGroup.create({
    data: {
      name,
      description,
      tag,
      appId
    },
  });
  res.json(result);
}