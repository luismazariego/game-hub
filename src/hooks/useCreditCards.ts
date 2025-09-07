import { useFinancialContext } from '../contexts/FinancialContext';

const useCreditCards = () => {
  const { creditCards } = useFinancialContext();
  return { data: creditCards, isLoading: false, error: null };
};

export default useCreditCards;