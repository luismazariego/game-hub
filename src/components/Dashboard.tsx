import { Text, SimpleGrid, Box, Stat, StatLabel, StatNumber, StatHelpText, Heading, VStack, HStack } from "@chakra-ui/react";
import useAccounts from "../hooks/useAccounts";
import useCreditCards from "../hooks/useCreditCards";
import AccountCard from "./AccountCard";
import CreditCardCard from "./CreditCardCard";
import AccountCardSkeleton from "./AccountCardSkeleton";
import AccountCardContainer from "./AccountCardContainer";
import { FinancialQuery } from "../App";

interface Props {
  financialQuery: FinancialQuery;
}

const Dashboard = ({ financialQuery }: Props) => {
  const { error: accountsError, data: accounts, isLoading: accountsLoading } = useAccounts();
  const { error: creditCardsError, data: creditCards, isLoading: creditCardsLoading } = useCreditCards();
  const skeletons = [1, 2, 3, 4];

  if(accountsError) return <Text>{accountsError}</Text>;
  if(creditCardsError) return <Text>{creditCardsError}</Text>;

  // Filter accounts based on query
  const filteredAccounts = accounts.filter(account => {
    const matchesType = !financialQuery.accountType || account.accountType.id === financialQuery.accountType.id;
    const matchesSearch = !financialQuery.searchText || 
      account.name.toLowerCase().includes(financialQuery.searchText.toLowerCase()) ||
      account.accountType.name.toLowerCase().includes(financialQuery.searchText.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Filter credit cards based on search
  const filteredCreditCards = creditCards.filter(creditCard => {
    const matchesSearch = !financialQuery.searchText || 
      creditCard.name.toLowerCase().includes(financialQuery.searchText.toLowerCase()) ||
      creditCard.bank.toLowerCase().includes(financialQuery.searchText.toLowerCase());
    return matchesSearch;
  });

  // Calculate total balance and debt
  const totalBalance = filteredAccounts.reduce((sum, account) => sum + account.balance, 0);
  const totalDebt = filteredCreditCards.reduce((sum, creditCard) => sum + creditCard.currentBalance, 0);
  const netWorth = totalBalance - totalDebt;

  return (
    <Box>
      {/* Financial Summary */}
      <Box marginBottom={8} paddingX={4}>
        <HStack spacing={8} align="stretch">
          <Stat>
            <StatLabel fontSize="lg">Total Assets</StatLabel>
            <StatNumber fontSize="2xl" color="green.400">${totalBalance.toLocaleString()}</StatNumber>
            <StatHelpText>Across {filteredAccounts.length} accounts</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel fontSize="lg">Total Debt</StatLabel>
            <StatNumber fontSize="2xl" color="red.400">${totalDebt.toLocaleString()}</StatNumber>
            <StatHelpText>Across {filteredCreditCards.length} credit cards</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel fontSize="lg">Net Worth</StatLabel>
            <StatNumber fontSize="2xl" color={netWorth >= 0 ? "green.400" : "red.400"}>
              ${netWorth.toLocaleString()}
            </StatNumber>
            <StatHelpText>Assets - Debt</StatHelpText>
          </Stat>
        </HStack>
      </Box>

      {/* Assets Section */}
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading size="lg" marginBottom={4} paddingX={4}>Assets</Heading>
          <SimpleGrid
            columns={{ sm: 1, md: 2, lg: 3 }}
            padding={4}
            spacing={6}
          >
            {accountsLoading &&
              skeletons.map((skeleton) => (
                <AccountCardContainer key={skeleton}>
                  <AccountCardSkeleton />
                </AccountCardContainer>
              ))}
            {filteredAccounts.map((account) => (
              <AccountCardContainer key={account.id}>
                <AccountCard account={account} />
              </AccountCardContainer>
            ))}
          </SimpleGrid>
        </Box>

        {/* Debts Section */}
        <Box>
          <Heading size="lg" marginBottom={4} paddingX={4}>Debts</Heading>
          <SimpleGrid
            columns={{ sm: 1, md: 2, lg: 3 }}
            padding={4}
            spacing={6}
          >
            {creditCardsLoading &&
              skeletons.map((skeleton) => (
                <AccountCardContainer key={`cc-${skeleton}`}>
                  <AccountCardSkeleton />
                </AccountCardContainer>
              ))}
            {filteredCreditCards.map((creditCard) => (
              <AccountCardContainer key={creditCard.id}>
                <CreditCardCard creditCard={creditCard} />
              </AccountCardContainer>
            ))}
            {!creditCardsLoading && filteredCreditCards.length === 0 && (
              <Text color="gray.500" paddingX={4}>No credit cards found.</Text>
            )}
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};

export default Dashboard;