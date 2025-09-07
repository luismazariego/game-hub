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
  NumberInput,
  NumberInputField,
  Switch,
  VStack,
  useToast,
  FormErrorMessage,
  HStack,
} from '@chakra-ui/react';
import { useFinancialContext } from '../contexts/FinancialContext';

interface AddCreditCardFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  bank: string;
  last4Digits: string;
  creditLimit: number;
  currentBalance: number;
  dueDate: string;
  minPayment: number;
  interestRate: number;
  isActive: boolean;
}

interface FormErrors {
  name?: string;
  bank?: string;
  last4Digits?: string;
  creditLimit?: string;
  currentBalance?: string;
  dueDate?: string;
  minPayment?: string;
  interestRate?: string;
}

const AddCreditCardForm: React.FC<AddCreditCardFormProps> = ({ isOpen, onClose }) => {
  const { addCreditCard } = useFinancialContext();
  const toast = useToast();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    bank: '',
    last4Digits: '',
    creditLimit: 0,
    currentBalance: 0,
    dueDate: '',
    minPayment: 0,
    interestRate: 0,
    isActive: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Credit card name is required';
    }

    if (!formData.bank.trim()) {
      newErrors.bank = 'Bank name is required';
    }

    if (!formData.last4Digits.trim()) {
      newErrors.last4Digits = 'Last 4 digits are required';
    } else if (!/^\d{4}$/.test(formData.last4Digits)) {
      newErrors.last4Digits = 'Must be exactly 4 digits';
    }

    if (formData.creditLimit <= 0) {
      newErrors.creditLimit = 'Credit limit must be greater than 0';
    }

    if (formData.currentBalance < 0) {
      newErrors.currentBalance = 'Balance cannot be negative';
    }

    if (formData.currentBalance > formData.creditLimit) {
      newErrors.currentBalance = 'Balance cannot exceed credit limit';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const dueDate = new Date(formData.dueDate);
      const today = new Date();
      if (dueDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    if (formData.minPayment < 0) {
      newErrors.minPayment = 'Minimum payment cannot be negative';
    }

    if (formData.interestRate < 0 || formData.interestRate > 100) {
      newErrors.interestRate = 'Interest rate must be between 0 and 100';
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
      addCreditCard({
        name: formData.name.trim(),
        bank: formData.bank.trim(),
        last4Digits: formData.last4Digits.trim(),
        creditLimit: formData.creditLimit,
        currentBalance: formData.currentBalance,
        dueDate: new Date(formData.dueDate),
        minPayment: formData.minPayment,
        interestRate: formData.interestRate,
        isActive: formData.isActive,
      });

      toast({
        title: 'Credit card added successfully',
        description: `${formData.name} has been added to your credit cards.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      resetForm();
      onClose();
    } catch (error) {
      toast({
        title: 'Error adding credit card',
        description: 'There was an error adding your credit card. Please try again.',
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
      bank: '',
      last4Digits: '',
      creditLimit: 0,
      currentBalance: 0,
      dueDate: '',
      minPayment: 0,
      interestRate: 0,
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
          <ModalHeader>Add New Credit Card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl isInvalid={!!errors.name} isRequired>
                <FormLabel>Credit Card Name</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Chase Sapphire Preferred"
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.bank} isRequired>
                <FormLabel>Bank/Issuer</FormLabel>
                <Input
                  value={formData.bank}
                  onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                  placeholder="e.g., Chase Bank"
                />
                <FormErrorMessage>{errors.bank}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.last4Digits} isRequired>
                <FormLabel>Last 4 Digits</FormLabel>
                <Input
                  value={formData.last4Digits}
                  onChange={(e) => setFormData({ ...formData, last4Digits: e.target.value })}
                  placeholder="1234"
                  maxLength={4}
                />
                <FormErrorMessage>{errors.last4Digits}</FormErrorMessage>
              </FormControl>

              <HStack spacing={4}>
                <FormControl isInvalid={!!errors.creditLimit} isRequired>
                  <FormLabel>Credit Limit</FormLabel>
                  <NumberInput
                    value={formData.creditLimit}
                    onChange={(valueString, valueNumber) => 
                      setFormData({ ...formData, creditLimit: valueNumber || 0 })
                    }
                    min={0}
                    precision={2}
                  >
                    <NumberInputField placeholder="10000.00" />
                  </NumberInput>
                  <FormErrorMessage>{errors.creditLimit}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.currentBalance} isRequired>
                  <FormLabel>Current Balance</FormLabel>
                  <NumberInput
                    value={formData.currentBalance}
                    onChange={(valueString, valueNumber) => 
                      setFormData({ ...formData, currentBalance: valueNumber || 0 })
                    }
                    min={0}
                    precision={2}
                  >
                    <NumberInputField placeholder="0.00" />
                  </NumberInput>
                  <FormErrorMessage>{errors.currentBalance}</FormErrorMessage>
                </FormControl>
              </HStack>

              <FormControl isInvalid={!!errors.dueDate} isRequired>
                <FormLabel>Due Date</FormLabel>
                <Input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
                <FormErrorMessage>{errors.dueDate}</FormErrorMessage>
              </FormControl>

              <HStack spacing={4}>
                <FormControl isInvalid={!!errors.minPayment}>
                  <FormLabel>Minimum Payment</FormLabel>
                  <NumberInput
                    value={formData.minPayment}
                    onChange={(valueString, valueNumber) => 
                      setFormData({ ...formData, minPayment: valueNumber || 0 })
                    }
                    min={0}
                    precision={2}
                  >
                    <NumberInputField placeholder="25.00" />
                  </NumberInput>
                  <FormErrorMessage>{errors.minPayment}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.interestRate}>
                  <FormLabel>Interest Rate (%)</FormLabel>
                  <NumberInput
                    value={formData.interestRate}
                    onChange={(valueString, valueNumber) => 
                      setFormData({ ...formData, interestRate: valueNumber || 0 })
                    }
                    min={0}
                    max={100}
                    precision={2}
                  >
                    <NumberInputField placeholder="18.99" />
                  </NumberInput>
                  <FormErrorMessage>{errors.interestRate}</FormErrorMessage>
                </FormControl>
              </HStack>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">
                  Active Credit Card
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
              Add Credit Card
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddCreditCardForm;