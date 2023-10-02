import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index";
import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard";

const Coin = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = new Array(132).fill(1);

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  useEffect(() => {
    const fetchExchange = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoin(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchExchange();
    // eslint-disable-next-line
  }, [currency, page]);

  if (error) {
    return <ErrorComponent message="Error While fatching Coins" />;
  }

  return (
    <Container maxWidth={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup p={8} value={currency} onChange={setCurrency}>
            <HStack spacing={4}>
              <Radio value="inr">INT</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coin.map((i) => {
              return (
                <CoinCard
                  key={i.id}
                  id={i.id}
                  name={i.name}
                  imgSrc={i.image}
                  price={i.current_price}
                  symbol={i.symbol}
                  currencySymbol={currencySymbol}
                />
              );
            })}
          </HStack>
          <HStack w={"fill"} overflowX={"auto"} p={8}>
            {btns.map((item, index) => {
              return (
                <Button
                  key={index}
                  bgColor={"blackAlpha.900"}
                  color={"white"}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </Button>
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coin;
