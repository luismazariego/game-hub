import { HStack, Text } from '@chakra-ui/react'
import ColorModeSwitch from './ColorModeSwitch'
import SearchInput from './SearchInput'

type Props = {
  onSearch: (searchText: string) => void;
};

const NavBar = ({onSearch}: Props) => {
  return (
    <HStack padding="10px">
      <Text fontSize="2xl" fontWeight="bold" marginRight={4}>
        💰 Financial Manager
      </Text>
      <SearchInput onSearch={onSearch} />
      <ColorModeSwitch />
    </HStack>
  )
}

export default NavBar