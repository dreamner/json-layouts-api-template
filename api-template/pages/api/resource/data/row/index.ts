import prisma from "../../../../../lib/prisma";

export default async function handle(req, res) {
    const {  tableId } = req.body;
    const result = await prisma.row.create({
        data: {
            tableId,
        },
    });
    res.json(result);
}