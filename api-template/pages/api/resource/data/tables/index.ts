import prisma from "../../../../../lib/prisma";

export default async function handle(req, res) {
    const { name, description, resourceGroupId } = req.body;
    const result = await prisma.table.create({
        data: {
            name,
            description,
            resourceGroupId,
        },
    });
    res.json(result);
}