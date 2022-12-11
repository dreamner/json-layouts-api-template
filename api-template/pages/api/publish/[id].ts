
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const appId = req.query.id;
  const post = await prisma.app.update({
    where: { id: appId },
    data: { published: true },
  });
  res.json(post);
}
