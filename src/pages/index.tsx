import type { NextPage } from "next";
import Head from "next/head";
import { Fragment, useEffect, useRef } from "react";
import { Comic } from "../server/router/xkcd";
import { trpc } from "../utils/trpc";

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const Home: NextPage = () => {
  const allComics = trpc.useInfiniteQuery(["xkcd.allComics", { limit: 10 }], {
    getNextPageParam: (lastPage) => lastPage.num,
  });

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    allComics.fetchNextPage();
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>xkcd gallery</title>
        <meta name="description" content="browse all of the xkcd comics" />
      </Head>

      <main className="container flex flex-col p-4">
        <div className="grid gap-3 pt-3 text-center grid-cols-4">
          <>
            {allComics?.data?.pages.map((page) => (
              <Fragment key={page.num}>
                {page.comics.map((comic) => (
                  <ComicCard key={comic?.num} comic={comic} />
                ))}
              </Fragment>
            ))}
          </>
        </div>
      </main>
    </>
  );
};

type ComicCardProps = {
  comic?: Comic;
};

const ComicCard = (props: ComicCardProps) => {
  if (!props.comic) return null;
  return (
    <section className="flex flex-col p-6 mt-8 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
      <a
        href={`https://xkcd.com/${props.comic.num}`}
        target="_blank"
        rel="noreferrer"
      >
        <h2 className="text-xl text-gray-700">{props.comic.title}</h2>
        <img className="mx-auto max-h-[250px]" src={props.comic.img} />
        <p className="text-sm text-gray-600">{props.comic.alt}</p>
      </a>
    </section>
  );
};

export default Home;
