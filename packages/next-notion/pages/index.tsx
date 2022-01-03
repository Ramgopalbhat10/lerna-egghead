import { GetStaticProps } from "next";
import React from "react";

const Home = ({ quote }) => {
  return (
    <div>
      <p>{JSON.stringify(quote)}</p>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const quote = await fetch(
    "https://breaking-bad-quotes.herokuapp.com/v1/quotes"
  ).then((res) => res.json());

  return {
    props: {
      quote,
    },
  };
};

export default Home;
