import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosPublic from '../api/axiosPublic';

export const useCustomers = () => {
  const queryClient = useQueryClient();

  const {
    data: customers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const res = await axiosPublic.get('/customers');
      return res.data;
    },
  });

  const createCustomer = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosPublic.post('/customers', formData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
    },
  });

  return {
    customers,
    isLoading,
    isError,
    createCustomer,
  };
};
