import { useSelector } from "react-redux";
import ItemCard from "./components/ItemCard";
import { Flex, Heading } from "@chakra-ui/react";
import Header from "./components/Header";
import Slip from "./components/Slip";

function App() {
  const items = useSelector((state) => state.items.items);

  return (
    <div style={{ padding: "40px" }}>
      <Heading as="h1" color={"green.500"} textAlign={"center"} mb={10}>
        Spend Money App
      </Heading>
      <Header />

      <Flex
        wrap={"wrap"}
        gap={20}
        justifyContent={"center"}
        alignItems={"center"}
        my={10}
      >
        {items.map((item, i) => {
          return (
            <div key={i}>
              <ItemCard props={item} />
            </div>
          );
        })}
      </Flex>

      <Slip />
    </div>
  );
}

export default App;
