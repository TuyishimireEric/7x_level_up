import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '@/src/services/todoService';
import useToast from '@/src/components/alerts/alerts';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: response => {
      if (response.success) {
        showSuccess('Todo deleted successfully!');
        queryClient.invalidateQueries({ queryKey: ['todos'] });
      } else {
        showError(response.error || 'Error deleting todo');
      }
    },
    onError: (error: unknown) => {
      const err = error as Error;
      showError(err.message || 'Error deleting todo');
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return {
    handleDelete,
    isPending: deleteMutation.isPending,
  };
};
