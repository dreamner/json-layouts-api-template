import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import prisma from "../../../../lib/prisma";

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  const app = await prisma.app.findUnique({
    where: {
      id: String(req.query?.id),
    },
    include: {
      resourceGroups: {
        select: { name: true, id: true },
      },
    } as any,
  });

  //     {
  //       type: "box",
  //       data: {
  //         flex: true,
  //         minHeight: "100vh",
  //         centerHorizontal: true,
  //         centerVertical: true,
  //         components: [
  //           {
  //             type: "box",
  //             data: {
  //               flexGrow: 1,
  //               components: [],
  //             },
  //           },
  //           {
  //             type: "box",
  //             data: {
  //               flexGrow: 1,
  //               components: [
  //                 ...[
  //                   {
  //                     type: "text",
  //                     data: {
  //                       text: "Available apps",
  //                       variant: "h3",
  //                     },
  //                   },
  //                   {
  //                     type: "button",
  //                     data: {
  //                       text: "Create a new app",
  //                       href: `https://json-layouts-api-template.vercel.app`,
  //                       target: "blank",
  //                       sx: "mt:4",
  //                     },
  //                   },
  //                 ],
  //                 ...[].map((app) => {
  //                   return {
  //                     type: "box",
  //                     data: {
  //                       components: [
  //                         {
  //                           type: "avatar",
  //                           data: {
  //                             imageUrl: app.image,
  //                           },
  //                         },
  //                         {
  //                           type: "text",
  //                           data: {
  //                             text: app.name,
  //                             variant: "h6",
  //                           },
  //                         },
  //                         {
  //                           type: "text",
  //                           data: {
  //                             text: app?.author?.name,
  //                           },
  //                         },
  //                         {
  //                           type: "button",
  //                           data: {
  //                             text: "View App",
  //                             clickAction: `update_state_value-appId-${app.id}`,
  //                             disabled: false,
  //                             sx: "mt:4",
  //                           },
  //                         },
  //                         {
  //                           type: "divider",
  //                           data: {},
  //                         },
  //                       ],
  //                     },
  //                   };
  //                 }),
  //               ],
  //             },
  //           },
  //           {
  //             type: "box",
  //             data: {
  //               flexGrow: 1,
  //               components: [],
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   ],
  // };
  res.json(app);
}
