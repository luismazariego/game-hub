import {
  Button,
  Heading,
  HStack,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useAccountTypes from "../hooks/useAccountTypes";
import { AccountType } from "../types/Account";

interface Props {
  onSelectAccountType: (accountType: AccountType) => void;
  selectedAccountType: AccountType | null;
}

const AccountsList = ({ onSelectAccountType, selectedAccountType }: Props) => {
  const { data, isLoading, error } = useAccountTypes();
  if (error) return null;
  if (isLoading) return <Spinner />;
  return (
    <>
      <Heading fontSize="2xl" marginBottom={5}>Account Types</Heading>
      <List>
        {data.map((accountType) => (
          <ListItem key={accountType.id} paddingY={3}>
            <HStack>
              <Text fontSize="2xl" marginRight={2}>
                {accountType.icon}
              </Text>
              <Button
                whiteSpace="normal"
                textAlign="left"
                fontWeight={accountType.id === selectedAccountType?.id ? "bold" : "normal"}
                onClick={() => onSelectAccountType(accountType)}
                fontSize="md"
                variant="link"
              >
                {accountType.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default AccountsList;