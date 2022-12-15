import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import prisma from "../../../lib/prisma";

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
  const apps = await prisma.app.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  const page = {
    ...appsPage,
    components: [
      {
        type: "box",
        data: {
          flex: true,
          minHeight: "100vh",
          centerHorizontal: true,
          centerVertical: true,
          components: [
            {
              type: "box",
              data: {
                flexGrow: 1,
                components: [],
              },
            },
            {
              type: "box",
              data: {
                flexGrow: 1,
                components: [
                  ...[
                    {
                      type: "text",
                      data: {
                        text: "Available apps",
                        variant: "h3",
                      },
                    },
                    {
                      type: "button",
                      data: {
                        text: "Create a new app",
                        href: `https://json-layouts-api-template.vercel.app/create`,
                        target: "blank",
                        sx: "mt:4",
                      },
                    },
                  ],
                  ...apps.map((app) => {
                    return {
                      type: "box",
                      data: {
                        components: [
                          {
                            type: "avatar",
                            data: {
                              imageUrl: app.image,
                            },
                          },
                          {
                            type: "text",
                            data: {
                              text: app.name,
                              variant: "h6",
                            },
                          },
                          {
                            type: "text",
                            data: {
                              text: app?.author?.name,
                            },
                          },
                          {
                            type: "button",
                            data: {
                              text: "View App",
                              clickAction: `update_state_value-appId-${app.id}`,
                              disabled: false,
                              sx: "mt:4",
                            },
                          },
                          {
                            type: "divider",
                            data: {},
                          },
                        ],
                      },
                    };
                  }),
                ],
              },
            },
            {
              type: "box",
              data: {
                flexGrow: 1,
                components: [],
              },
            },
          ],
        },
      },
    ],
  };
  res.json(page);
}

var appsPage = {
  layout: "page",
  name: "Hello World",
  components: [
    {
      type: "box",
      data: {
        components: [
          {
            type: "box",
            data: {
              components: [
                {
                  type: "text",
                  data: {
                    text: "Hello World",
                    variant: "h1",
                  },
                },
                {
                  type: "text",
                  data: {
                    text: "Sorry, but no pages have been added yet!",
                  },
                },
                {
                  type: "button",
                  data: {
                    text: "Add pages to this app",
                    href: "https://json-layouts-api-template.vercel.app/api/auth/signin",
                    target: "blank",
                    sx: "mt:4",
                  },
                },
                // {
                //   type: "image",
                //   data: {
                //     imageUrl:
                //       "http://res.cloudinary.com/dreamercodes/image/upload/v1670928699/Screenshot_2021-09-05-21-17-28-950_host.exp.exponent_i7hxjl.jpg",
                //   },
                // },
              ],
            },
          },
        ],
      },
    },
  ],
  opts: {},
};
