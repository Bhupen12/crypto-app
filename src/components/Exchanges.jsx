import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index";
import {
  Container,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchange = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchExchange();
    // eslint-disable-next-line
  }, []);

  if (error) {
    return <ErrorComponent message="Error While fatching" />;
  }

  return (
    <Container maxWidth={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((i) => {
              return (
                <ExchangeCard
                  key={i.id}
                  name={i.name}
                  rank={i.trust_score_rank}
                  imgSrc={i.image}
                  url={i.url}
                />
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, rank, imgSrc, url }) => (
  <a href={url} target={"blank"}>
    <VStack
      w={52}
      shadow={"lg"}
      p={8}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image
        src={imgSrc}
        w={10}
        h={10}
        objectFit={"contain"}
        alt={"Exchange"}
      />
      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>
      <Text size={"md"} noOfLines={1}>
        {name}
      </Text>
    </VStack>
  </a>
);

export default Exchanges;
