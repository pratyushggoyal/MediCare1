import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const BottomList = () => {
  const ListArray = [
    "All Essentials",
   
  ];
  return (
    <Box bg='rgb(169, 169, 169)' w='100%' padding={'10px'} >
      <Container size={"5xl"}>
        <Flex margin={"auto"} justifyContent="center" gap={"4%"}>
          {ListArray.map((ele, index) => {
            return (
              <Link key={index} to={`/products`}>
                <Text fontSize={"20px"}  whiteSpace='nowrap'>
                  {ele}
                </Text>
              </Link>
            );
          })}
        </Flex>
      </Container>
    </Box>
  );
};
export default BottomList;
