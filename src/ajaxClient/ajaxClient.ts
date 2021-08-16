const BASE_URL = process.env.REACT_APP_SERVER_URL;

const createOptions = (payload: Object | undefined = undefined) => {
  const options = payload ? { method: "POST" } : { method: "GET" };
  if (payload) {
    Object.assign(options, {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return options;
};

type getArgs = {
  url: string;
};
type postArgs = {
  url: string;
  payload: Object;
};

export const ajaxClient = {
  get: ({ url }: getArgs) => {
    const options = createOptions();
    return fetch(BASE_URL + url, options);
  },
  post: ({ url, payload }: postArgs) => {
    const options = createOptions(payload);
    return fetch(BASE_URL + url, options);
  },
};
