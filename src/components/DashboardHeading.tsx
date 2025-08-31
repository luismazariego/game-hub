import { Heading } from "@chakra-ui/react";
import { FinancialQuery } from "../App";

type Props = {
  financialQuery: FinancialQuery;
};

const DashboardHeading = ({ financialQuery }: Props) => {
  const heading = `${financialQuery.accountType?.name || "All"} Accounts`;
  
  return (
    <Heading as="h1" marginY={5} fontSize="5xl">
      {heading}
    </Heading>
  );
};

export default DashboardHeading;