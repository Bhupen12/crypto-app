import React, { useEffect, useState } from "react";
import { server } from "../index";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  HStack,
  Image,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";

const CoinDetail = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const param = useParams();

  useEffect(() => {
    const fetchExchange = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${param.id}`);
        setCoin(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchExchange();
    // eslint-disable-next-line
  }, [param.id]);

  if (error) {
    return <ErrorComponent message="Error While fatching Coin" />;
  }

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={"full"} borderWidth={1}>
            sajhay
          </Box>

          <RadioGroup p={8} value={currency} onChange={setCurrency}>
            <HStack spacing={4}>
              <Radio value="inr">INT</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>
        </>
      )}
    </Container>
  );
};

export default CoinDetail;
