import { Card, CardBody, Heading, HStack, Text, Badge, VStack, Progress } from "@chakra-ui/react";
import { CreditCard } from "../types/Account";

type Props = {
  creditCard: CreditCard;
};

const CreditCardCard = ({ creditCard }: Props) => {
  const utilizationPercent = (creditCard.currentBalance / creditCard.creditLimit) * 100;
  
  const getUtilizationColor = (percent: number) => {
    if (percent > 80) return "red";
    if (percent > 50) return "yellow";
    return "green";
  };

  const getDueDateColor = (dueDate: Date) => {
    const daysUntilDue = Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntilDue < 7) return "red";
    if (daysUntilDue < 14) return "yellow";
    return "green";
  };

  const daysUntilDue = Math.ceil((creditCard.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card>
      <CardBody>
        <VStack align="stretch" spacing={3}>
          <HStack justifyContent="space-between">
            <Text fontSize="xl">💳</Text>
            <Badge colorScheme="blue" fontSize="sm">
              CREDIT CARD
            </Badge>
          </HStack>
          
          <Heading fontSize="lg" noOfLines={1}>
            {creditCard.name}
          </Heading>
          
          <Text fontSize="sm" color="gray.500">
            {creditCard.bank} •••• {creditCard.last4Digits}
          </Text>
          
          <VStack align="stretch" spacing={2}>
            <HStack justifyContent="space-between">
              <Text fontSize="sm">Balance</Text>
              <Text fontWeight="bold">${creditCard.currentBalance.toLocaleString()}</Text>
            </HStack>
            
            <HStack justifyContent="space-between">
              <Text fontSize="sm">Limit</Text>
              <Text fontSize="sm">${creditCard.creditLimit.toLocaleString()}</Text>
            </HStack>
            
            <VStack align="stretch">
              <HStack justifyContent="space-between">
                <Text fontSize="xs">Utilization</Text>
                <Text fontSize="xs">{utilizationPercent.toFixed(1)}%</Text>
              </HStack>
              <Progress 
                value={utilizationPercent} 
                colorScheme={getUtilizationColor(utilizationPercent)}
                size="sm"
              />
            </VStack>
            
            <HStack justifyContent="space-between">
              <Text fontSize="sm">Due Date</Text>
              <Text fontSize="sm" color={`${getDueDateColor(creditCard.dueDate)}.400`}>
                {creditCard.dueDate.toLocaleDateString()} ({daysUntilDue}d)
              </Text>
            </HStack>
            
            {creditCard.minPayment > 0 && (
              <HStack justifyContent="space-between">
                <Text fontSize="sm">Min Payment</Text>
                <Text fontSize="sm" fontWeight="bold" color="red.400">
                  ${creditCard.minPayment.toLocaleString()}
                </Text>
              </HStack>
            )}
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default CreditCardCard;