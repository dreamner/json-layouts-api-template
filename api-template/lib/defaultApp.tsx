const helloWorld = {
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
              ],
            },
          },
        ],
      },
    },
  ],
  opts: {},
};

export default helloWorld;
