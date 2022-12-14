const defaultPage = {
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

export default defaultPage;
