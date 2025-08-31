import creditCards from '../data/creditCards';
import { CreditCard } from '../types/Account';

const useCreditCards = () => ({data: creditCards, isLoading: false, error: null});

export default useCreditCards;