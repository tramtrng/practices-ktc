

const url = 'https://server.aptech.io/online-shop/customers';

type Props = {
  customerId: number;
  onDeleted?: (id: number) => void;
};

export default function Delete({ customerId, onDeleted }: Props) {
  const handleOnDelete = async (id: number) => {
    try {
      if (!confirm('Are you sure you want to delete this customer?')) {
        console.log('Delete operation cancelled');
        return;
      }

      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Customer deleted successfully:', data);
      if (onDeleted && typeof onDeleted === 'function') {
        onDeleted(id);
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <button
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      onClick={() => handleOnDelete(customerId)}
    >
      Delete
    </button>
  );
}
