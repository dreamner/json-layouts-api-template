import prisma from "../../../../../lib/prisma";

export default async function handle(req, res) {
  let images = req.body;
  let saved = [];
  for (let image of images) {
    const { url, resourceGroupId } = image;
    const result = await prisma.image.create({
      data: {
        url,
        resourceGroupId,
      },
    });
    saved.push(result);
  }
  res.json(saved);
}
