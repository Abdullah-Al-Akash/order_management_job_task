import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosPublic from '@/api/axiosPublic';

export function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axiosPublic.get('/products');
      return res.data;
    },
  });

  const addProduct = useMutation({
    mutationFn: (newProduct) => axiosPublic.post('/products', newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  const updateProduct = useMutation({
    mutationFn: ({ id, ...data }) => axiosPublic.put(`/products/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  const deleteProduct = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  return {
    products: productsQuery.data || [],
    isLoading: productsQuery.isLoading,
    isError: productsQuery.isError,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
