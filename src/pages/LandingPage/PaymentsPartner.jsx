import { ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Flex, Grid, Heading, Image, Link, Text } from "@chakra-ui/react"

export const PaymentsPartner = () => {
    const paymentsdata = [
        
        
    ]
  return (
    <Box p='8px 25px' mb='10px' display={{base: 'none', md: 'none', lg: 'block'}}>
        <Box display={'flex'} alignItems='center' justifyContent='space-between' mb='30px'>
            
        </Box>
        <Flex gap={4}>
            {
                paymentsdata.map(el => (
                    <Flex key={el.id} p={2} borderRadius='5px' bg='#fff'>
                        <Box display={'flex'} justifyContent='center' alignItems={'center'} p='0 10px'>
                            <Image borderRight={'1px solid gray'} pr='10px' w='80px' h='40px' src={process.env.PUBLIC_URL + `/Images/netmedP${el.id}.png`}></Image>
                        </Box>
                        <Box>
                            <Text fontSize={'12px'} as='b'>{el.boldTitle}</Text>
                            <Text fontSize={'12px'}>{el.title}</Text>
                        </Box>
                    </Flex>
                ))
            }
        </Flex>
    </Box>
  )
}
