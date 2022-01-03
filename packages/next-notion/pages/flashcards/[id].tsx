import { Client } from "@notionhq/client";
import { GetStaticPaths, GetStaticProps } from "next";

const FlashCard = ({ card }) => {
  return <pre>{JSON.stringify(card, null, 2)}</pre>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  });
  const db = await notion.databases.query({
    database_id: process.env.DB_ID,
    page_size: 100,
  });

  const paths = [];
  db.results.forEach((page) => {
    paths.push({
      params: {
        id: page.id,
      },
    });
  });
  console.log(paths);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  });
  const page = await notion.pages.retrieve({
    page_id: id as string,
  });

  const title = page.properties["Name"]["title"][0].plain_text;

  return {
    props: {
      card: title,
    },
  };
};

export default FlashCard;
