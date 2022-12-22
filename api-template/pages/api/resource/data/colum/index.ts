import prisma from "../../../../../lib/prisma";

export default async function handle(req, res) {
    const { key, tableId } = req.body;
    const result = await prisma.column.create({
        data: {
            key,
            tableId:  tableId,
        },
    });
    res.json(result);
}