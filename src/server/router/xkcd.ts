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

export const xkcdRouter = createRouter().query("currentComic", {
  async resolve() {
    return getCurrentComic();
  },
});

const getCurrentComic = async (): Promise<Comic> => {
  const response = await fetch("https://xkcd.com/info.0.json");

  return response.json().then((res) => res);
};
