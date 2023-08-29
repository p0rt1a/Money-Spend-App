import {
  Image,
  Heading,
  Input,
  Card,
  CardFooter,
  CardBody,
  Button,
  Flex,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { buy, sell } from "../redux/items/itemsSlice";

function ItemCard({ props }) {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleBuy = () => {
    try {
      dispatch(buy({ price: props.price, count, name: props.name }));
    } catch (e) {
      toast({
        title: "An error occured!",
        status: "error",
        isClosable: true,
        duration: 3500,
        description: e.message,
      });
    }
  };

  const handleSell = () => {
    try {
      dispatch(sell({ price: props.price, count, name: props.name }));
    } catch (e) {
      toast({
        title: "An error occured!",
        status: "error",
        isClosable: true,
        duration: 3500,
        description: e.message,
      });
    }
  };

  const convertToDecimal = (value) => {
    const amount = new Intl.NumberFormat("USD", {
      style: "currency",
      currency: "USD",
    }).format(value / 100);

    return amount;
  };

  return (
    <Card maxW={"xs"} shadow={"md"} textAlign={"center"}>
      <CardBody>
        <Stack spacing={2}>
          <Image src={props.image} />
          <Heading as="h3" size={"md"} fontWeight={"400"}>
            {props.name}
          </Heading>
          <Flex justifyContent={"center"} alignItems={"center"} gap={5}>
            <MinusIcon
              onClick={() => {
                if (count > 1) {
                  var newCount = count - 1;
                  setCount(newCount);
                }
              }}
            />
            <Input
              textAlign={"center"}
              w={"100px"}
              size={"sm"}
              type="number"
              value={count}
              onChange={() => {}}
            />
            <AddIcon
              onClick={() => {
                var newCount = count + 1;
                setCount(newCount);
              }}
            />
          </Flex>
          <Text>{convertToDecimal(props.price)}</Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <Flex justifyContent={"space-around"} alignItems={"center"} w={"100%"}>
          <Button colorScheme="green" variant={"outline"} onClick={handleSell}>
            Sell
          </Button>
          <Button colorScheme="green" onClick={handleBuy}>
            Buy
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
}

export default ItemCard;
