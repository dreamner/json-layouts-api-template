import prisma from "../../../../../lib/prisma";

export default async function handle(req, res) {
    const { name, description, tableId } = req.body;
    const result = await prisma.column.create({
        data: {
            name,
            description,
            table: { connect: { tableId } },
        },
    });
    res.json(result);
}