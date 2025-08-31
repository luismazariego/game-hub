import accounts from '../data/accounts';
import { Account } from '../types/Account';

const useAccounts = () => ({data: accounts, isLoading: false, error: null});

export default useAccounts;