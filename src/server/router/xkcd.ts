import { createRouter } from "./context";
import { z } from "zod";

export type Comic = {
  year: string;
  month: string;
  day: string;
  num: number;
  link: string;
  safe_title: string;
  transcript: string;
  alt: string;
  img: string;
  title: string;
};

export const xkcdRouter = createRouter()
  .query("currentComic", {
    async resolve() {
      return fetchCurrentComic();
    },
  })
  .query("allComics", {
    input: z.object({
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.number().nullish(),
    }),
    async resolve({ input }) {
      const comics = await fetchComics(input.cursor, input.limit || 50);
      let lastComic = comics.pop();
      let nextCursor = lastComic!.num - 1;
      return {
        comics: [...comics, lastComic],
        num: nextCursor,
      };
    },
  });

const fetchCurrentComic = async (): Promise<Comic> => {
  const response = await fetch("https://xkcd.com/info.0.json");

  return response.json().then((res) => res);
};

const fetchComics = async (
  comicId: number | null | undefined,
  limit: number
): Promise<Comic[]> => {
  const requests = [];
  let start;
  if (!comicId) {
    // TODO: Does this automatically get cached by react-query, or do I need to manually cache it?
    const currentComic = await fetchCurrentComic();
    start = currentComic.num;
  } else {
    start = comicId;
  }
  for (let i = start; i > 0 && i > start - limit; i--) {
    requests.push(() => fetch(`https://xkcd.com/${i}/info.0.json`));
  }

  const responses = await Promise.all(requests.map((f) => f()));
  const jsons = await Promise.all(responses.map((r) => r.json()));
  return jsons;
};
