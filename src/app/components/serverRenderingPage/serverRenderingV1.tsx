export default async function Page() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store", // Évite la mise en cache pour obtenir des données à jour
  });

  if (!response.ok) {
    throw new Error(
      `Erreur lors de la récupération des données : ${response.statusText}`
    );
  }

  const posts = await response.json();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Posts</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Titre</th>
            <th className="border border-gray-300 px-4 py-2">Contenu</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: { id: number; title: string; body: string }) => (
            <tr key={post.id}>
              <td className="border border-gray-300 px-4 py-2">{post.id}</td>
              <td className="border border-gray-300 px-4 py-2">{post.title}</td>
              <td className="border border-gray-300 px-4 py-2">{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
