export default function reducer(state = {}, action: any) {
    const { key = "", type, payload } = action;
    console.log(payload)
    switch (type) {
      case "update_all": {
        return { ...state, [key]: payload };
      }
      default: {
        return { ...state };
      }
    }
  }
  