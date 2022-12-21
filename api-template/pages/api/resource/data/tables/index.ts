import prisma from "../../../../../lib/prisma";

export default async function handle(req, res) {
    const { name, description, resourceGroupId } = req.body;
    const result = await prisma.table.create({
        data: {
            name,
            description,
            resourceGroup: { connect: { resourceGroupId } },
        },
    });
    res.json(result);
}