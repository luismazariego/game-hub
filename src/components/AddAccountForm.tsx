import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  Switch,
  VStack,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useFinancialContext } from '../contexts/FinancialContext';
import useAccountTypes from '../hooks/useAccountTypes';
import { AccountType } from '../types/Account';

interface AddAccountFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  accountType: AccountType | null;
  balance: number;
  currency: string;
  description: string;
  isActive: boolean;
}

interface FormErrors {
  name?: string;
  accountType?: string;
  balance?: string;
  currency?: string;
}

const AddAccountForm: React.FC<AddAccountFormProps> = ({ isOpen, onClose }) => {
  const { addAccount } = useFinancialContext();
  const { data: accountTypes } = useAccountTypes();
  const toast = useToast();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    accountType: null,
    balance: 0,
    currency: 'USD',
    description: '',
    isActive: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Account name is required';
    }

    if (!formData.accountType) {
      newErrors.accountType = 'Account type is required';
    }

    if (formData.balance < 0) {
      newErrors.balance = 'Balance cannot be negative';
    }

    if (!formData.currency.trim()) {
      newErrors.currency = 'Currency is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      addAccount({
        name: formData.name.trim(),
        accountType: formData.accountType!,
        balance: formData.balance,
        currency: formData.currency.trim(),
        description: formData.description.trim(),
        isActive: formData.isActive,
      });

      toast({
        title: 'Account added successfully',
        description: `${formData.name} has been added to your accounts.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      resetForm();
      onClose();
    } catch (error) {
      toast({
        title: 'Error adding account',
        description: 'There was an error adding your account. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      accountType: null,
      balance: 0,
      currency: 'USD',
      description: '',
      isActive: true,
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Add New Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl isInvalid={!!errors.name} isRequired>
                <FormLabel>Account Name</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Emergency Fund, Checking Account"
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.accountType} isRequired>
                <FormLabel>Account Type</FormLabel>
                <Select
                  value={formData.accountType?.id || ''}
                  onChange={(e) => {
                    const selectedType = accountTypes.find(type => type.id === parseInt(e.target.value));
                    setFormData({ ...formData, accountType: selectedType || null });
                  }}
                  placeholder="Select account type"
                >
                  {accountTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.icon} {type.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.accountType}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.balance} isRequired>
                <FormLabel>Initial Balance</FormLabel>
                <NumberInput
                  value={formData.balance}
                  onChange={(valueString, valueNumber) => 
                    setFormData({ ...formData, balance: valueNumber || 0 })
                  }
                  min={0}
                  precision={2}
                >
                  <NumberInputField placeholder="0.00" />
                </NumberInput>
                <FormErrorMessage>{errors.balance}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.currency} isRequired>
                <FormLabel>Currency</FormLabel>
                <Input
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  placeholder="USD"
                />
                <FormErrorMessage>{errors.currency}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>Description (Optional)</FormLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Additional details about this account"
                  resize="vertical"
                />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">
                  Active Account
                </FormLabel>
                <Switch
                  isChecked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              colorScheme="blue" 
              isLoading={isSubmitting}
              loadingText="Adding..."
            >
              Add Account
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddAccountForm;