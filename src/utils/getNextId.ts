export default function getNextId(ids: string[]) {
  const maxId = Math.max(...ids.map((id) => parseInt(id)));

  return (maxId + 1).toString();
}
