import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";

const FlashCards = ({ flashcards }: { flashcards: QueryDatabaseResponse }) => {
  return (
    <div>
      {flashcards.results.map((card) => (
        <div key={card.id}>
          <Link href={`/flashcards/${card.id}`}>
            <a>{card.properties["Name"]["title"][0].plain_text}</a>
          </Link>
          <span>{card.properties["Tags"]["multi_select"][0].name}</span>
          {/* <div>{JSON.stringify(card.properties["Name"], null, 2)}</div> */}
        </div>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  });
  // const data = await notion.blocks.children.list({
  //   block_id: process.env.PAGE_ID,
  // });
  const db = await notion.databases.query({
    database_id: process.env.DB_ID,
    page_size: 100,
  });

  return {
    props: {
      flashcards: db,
    },
  };
};

export default FlashCards;
