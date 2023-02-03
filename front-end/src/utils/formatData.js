export default function formatDate(date) {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  const formattedDate = new Date(date).toLocaleDateString('pt-BR', options);
  return formattedDate;
}
