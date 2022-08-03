import type { NextPage } from "next";
import Head from "next/head";
import { Comic } from "../server/router/xkcd";
import { trpc } from "../utils/trpc";

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const Home: NextPage = () => {
  const currentComic = trpc.useQuery(["xkcd.currentComic"]);
  const currentComicNum = currentComic?.data?.num;

  return (
    <>
      <Head>
        <title>xkcd gallery</title>
        <meta name="description" content="browse all of the xkcd comics" />
      </Head>

      <main className="container flex flex-col min-h-screen p-4">
        <div>{currentComicNum}</div>
        <div className="grid gap-3 pt-3 text-center grid-cols-6">
          {currentComic.data ? (
            <>
              <ComicCard comic={currentComic.data} />
              <ComicCard comic={currentComic.data} />
              <ComicCard comic={currentComic.data} />
              <ComicCard comic={currentComic.data} />
              <ComicCard comic={currentComic.data} />
              <ComicCard comic={currentComic.data} />
              <ComicCard comic={currentComic.data} />
              <ComicCard comic={currentComic.data} />
              <ComicCard comic={currentComic.data} />
              <ComicCard comic={currentComic.data} />
              <ComicCard comic={currentComic.data} />
              <ComicCard comic={currentComic.data} />
              <ComicCard comic={currentComic.data} />
              <ComicCard comic={currentComic.data} />
              <ComicCard comic={currentComic.data} />
              <ComicCard comic={currentComic.data} />
              <ComicCard comic={currentComic.data} />
              <ComicCard comic={currentComic.data} />
              <ComicCard comic={currentComic.data} />
              <ComicCard comic={currentComic.data} />
            </>
          ) : (
            <p>Loading..</p>
          )}
        </div>
      </main>
    </>
  );
};

type ComicCardProps = {
  comic: Comic;
};

const ComicCard: React.VFC<ComicCardProps> = (props) => {
  return (
    <section className="flex flex-col p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
      <a href={`https://xkcd.com/${props.comic.num}`} target="_blank">
        <h2 className="text-xl text-gray-700">{props.comic.title}</h2>
        <img src={props.comic.img} />
        <p className="text-sm text-gray-600">{props.comic.alt}</p>
      </a>
    </section>
  );
};

export default Home;
