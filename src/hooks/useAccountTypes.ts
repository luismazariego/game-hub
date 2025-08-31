import accountTypes from '../data/accountTypes';
import { AccountType } from '../types/Account';

const useAccountTypes = () => ({data: accountTypes, isLoading: false, error: null});

export default useAccountTypes;