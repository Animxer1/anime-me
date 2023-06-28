import Head from "next/head";

const HtmlHead = ({ title = "Animetsu" }: { title: string }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="All your favourites are here..." />
    </Head>
  );
};

export default HtmlHead;
