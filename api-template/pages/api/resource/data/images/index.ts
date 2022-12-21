import prisma from "../../../../../lib/prisma";

export default async function handle(req, res) {
    const { url, resourceGroupId } = req.body;
    const result = await prisma.image.create({
        data: {
            url,
            resourceGroup: { connect: { resourceGroupId } },
        },
    });
    res.json(result);
}