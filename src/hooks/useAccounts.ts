import { useFinancialContext } from '../contexts/FinancialContext';

const useAccounts = () => {
  const { accounts } = useFinancialContext();
  return { data: accounts, isLoading: false, error: null };
};

export default useAccounts;