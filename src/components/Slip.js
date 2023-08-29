import { useSelector } from "react-redux";
import { Heading, Text, Divider } from "@chakra-ui/react";

function Slip() {
  const items = useSelector((state) => state.items.slipItems);

  const convertToDecimal = (value) => {
    const amount = new Intl.NumberFormat("USD", {
      style: "currency",
      currency: "USD",
    }).format(value / 100);

    return amount;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Heading as="h3" size={"lg"} fontWeight={"500"} color={"blue.500"}>
        Your Activity
      </Heading>
      <Divider />
      {items.map((item, i) => {
        return (
          <div key={i}>
            <Text color={item.isSold ? "green.400" : "red.600"}>
              {item.name} {item.count} x {convertToDecimal(item.price)}
            </Text>
          </div>
        );
      })}
    </div>
  );
}

export default Slip;
