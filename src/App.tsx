import { Box, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import AccountsList from "./components/AccountsList";
import { useState } from "react";
import { AccountType } from "./types/Account";
import AccountTypeSelector from "./components/AccountTypeSelector";
import SortSelector from "./components/SortSelector";
import DashboardHeading from './components/DashboardHeading';

export interface FinancialQuery {
  accountType: AccountType | null;
  sortOrder: string;
  searchText: string;
}

// Keep for backward compatibility with existing components
export interface GameQuery {
  genre: any;
  platform: any; 
  sortOrder: string;
  searchText: string;
}

function App() {
  const [financialQuery, setFinancialQuery] = useState<FinancialQuery>({} as FinancialQuery);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar onSearch={(searchText) => setFinancialQuery({...financialQuery, searchText})}/>
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <AccountsList
            selectedAccountType={financialQuery.accountType}
            onSelectAccountType={(accountType) => setFinancialQuery({ ...financialQuery, accountType })}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2} >
          <DashboardHeading financialQuery={financialQuery} />
          <Flex marginBottom={5}>
            <Box marginRight={5}>
              <AccountTypeSelector
                selectedAccountType={financialQuery.accountType}
                onSelectAccountType={(accountType) =>
                  setFinancialQuery({ ...financialQuery, accountType })
                }
              />
            </Box>
            <SortSelector
              onSelectSortOrder={(sortOrder) =>
                setFinancialQuery({ ...financialQuery, sortOrder })
              }
              sortOrder={financialQuery.sortOrder}
            />
          </Flex>
        </Box>
        <Dashboard financialQuery={financialQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
