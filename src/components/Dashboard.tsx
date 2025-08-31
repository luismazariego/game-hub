import { Text, SimpleGrid, Box, Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import useAccounts from "../hooks/useAccounts";
import AccountCard from "./AccountCard";
import AccountCardSkeleton from "./AccountCardSkeleton";
import AccountCardContainer from "./AccountCardContainer";
import { FinancialQuery } from "../App";

interface Props {
  financialQuery: FinancialQuery;
}

const Dashboard = ({ financialQuery }: Props) => {
  const { error, data, isLoading } = useAccounts();
  const skeletons = [1, 2, 3, 4];

  if(error) return <Text>{error}</Text>;

  // Filter accounts based on query
  const filteredAccounts = data.filter(account => {
    const matchesType = !financialQuery.accountType || account.accountType.id === financialQuery.accountType.id;
    const matchesSearch = !financialQuery.searchText || 
      account.name.toLowerCase().includes(financialQuery.searchText.toLowerCase()) ||
      account.accountType.name.toLowerCase().includes(financialQuery.searchText.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Calculate total balance
  const totalBalance = filteredAccounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <Box>
      <Box marginBottom={8} paddingX={4}>
        <Stat>
          <StatLabel fontSize="lg">Total Balance</StatLabel>
          <StatNumber fontSize="3xl" color="green.400">${totalBalance.toLocaleString()}</StatNumber>
          <StatHelpText>Across {filteredAccounts.length} accounts</StatHelpText>
        </Stat>
      </Box>
      
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3 }}
        padding={4}
        spacing={6}
      >
        {isLoading &&
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
  );
};

export default Dashboard;