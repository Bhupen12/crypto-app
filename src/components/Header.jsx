import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HStack
      p={4}
      spacing={10}
      justifyContent={["space-evenly", "left"]}
      shadow={"base"}
      bgColor={"blackAlpha.900"}
    >
      <Button variant={"unstyled"} color={"white"}>
        <Link to={"/"}>Home</Link>
      </Button>
      <Button variant={"unstyled"} color={"white"}>
        <Link to={"/exchanges"}>Exchanges</Link>
      </Button>
      <Button variant={"unstyled"} color={"white"}>
        <Link to={"/coin"}>Coin</Link>
      </Button>
    </HStack>
  );
};

export default Header;
