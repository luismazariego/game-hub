import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useAccountTypes from "../hooks/useAccountTypes";
import { AccountType } from "../types/Account";

interface Props {
  onSelectAccountType: (accountType: AccountType) => void;
  selectedAccountType: AccountType | null;
}

const AccountTypeSelector = ({ onSelectAccountType, selectedAccountType }: Props) => {
  const { data, error } = useAccountTypes();
  if (error) return null;
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedAccountType?.name || "Account Types"}
      </MenuButton>
      <MenuList>
        {data.map((accountType) => (
          <MenuItem
            onClick={() => onSelectAccountType(accountType)}
            key={accountType.id}
          >
            {accountType.icon} {accountType.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default AccountTypeSelector;