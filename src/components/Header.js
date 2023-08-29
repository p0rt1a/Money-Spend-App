import { useSelector } from "react-redux";
import { Flex, Image, Text } from "@chakra-ui/react";

function Header() {
  const balance = useSelector((state) => state.items.balance);

  const convertToDecimal = (value) => {
    const amount = new Intl.NumberFormat("USD", {
      style: "currency",
      currency: "USD",
    }).format(value / 100);

    return amount;
  };

  return (
    <Flex direction={"column"} alignItems={"center"} gap={2}>
      <Image
        src="https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
        objectFit={"cover"}
        boxSize={"120px"}
        borderRadius={"50%"}
      />
      <Text
        p={[3, 3, 5]}
        backgroundColor={"green.500"}
        color={"white"}
        w={["95%", "300px", "400px"]}
        borderRadius={"8px"}
        textAlign={"center"}
        fontSize={["lg", "lg", "xl"]}
      >
        {convertToDecimal(balance)}
      </Text>
    </Flex>
  );
}

export default Header;
