

import { Avatar, AvatarBadge, Box, Flex, Text } from "@chakra-ui/react";

import { HiShoppingCart } from "react-icons/hi";

const CartButton = ({count}) => {  

  return (
    <>
      <Box
        bgColor={"rgb(44,53,57)"}
        _hover={{ bg: "rgb(44,53,57)" }}
        size="xs"
      >
        <Flex align={"center"}>
          <Avatar
            paddingLeft={"10px"}
            icon={<HiShoppingCart />}
            bg='"rgb(44,53,57)"'
            boxSize={"30px"}
            position="relative"
          >
            <AvatarBadge
              boxSize="15px"
              bg="red.500"
              border={"0px"}
              fontSize="10px"
              position={"absolute"}
              top="0"
            >
              {count}
            </AvatarBadge>
          </Avatar>

          <Text
            color={"white"}
            fontSize="14px"
            fontWeight="semibold"
            paddingLeft={"5px"}
          >
            Cart
          </Text>
        </Flex>
      </Box>
    </>
  );
};
export default CartButton;
