export const getStateColor = (state: string | undefined) => {
  switch (state) {
    case 'pending':
      return 'bg-blue-100 text-blue-700';
    case 'approved':
      return 'bg-green-100 text-green-700';
    case 'rejected':
      return 'bg-red-100 text-red-700';
    case 'completed':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};
