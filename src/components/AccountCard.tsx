import { Card, CardBody, Heading, HStack, Text, Badge, VStack } from "@chakra-ui/react";
import { Account } from "../types/Account";

type Props = {
  account: Account;
};

const AccountCard = ({ account }: Props) => {
  const getBalanceColor = (balance: number) => {
    if (balance > 10000) return "green";
    if (balance > 1000) return "yellow";
    return "red";
  };

  return (
    <Card>
      <CardBody>
        <VStack align="stretch" spacing={3}>
          <HStack justifyContent="space-between">
            <Text fontSize="2xl">{account.accountType.icon}</Text>
            <Badge colorScheme={getBalanceColor(account.balance)} fontSize="sm">
              {account.accountType.name}
            </Badge>
          </HStack>
          
          <Heading fontSize="xl" noOfLines={1}>
            {account.name}
          </Heading>
          
          <Text fontSize="2xl" fontWeight="bold" color={`${getBalanceColor(account.balance)}.400`}>
            ${account.balance.toLocaleString()}
          </Text>
          
          {account.description && (
            <Text fontSize="sm" color="gray.500" noOfLines={2}>
              {account.description}
            </Text>
          )}
          
          <Text fontSize="xs" color="gray.400">
            Updated {account.updatedAt.toLocaleDateString()}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default AccountCard;