import { Suspense } from "react";

export default async function Page() {
  const posts = await getPosts(); // Récupération côté serveur (SSR)

  return (
    <Suspense fallback={<Loading />}>
      <PostTable posts={posts} />
    </Suspense>
  );
}

// Fonction pour récupérer les posts
async function getPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });
  return response.json();
}

// Composant d'affichage principal
function PostTable({
  posts,
}: {
  posts: { id: number; title: string; body: string }[];
}) {
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
          {posts.map((post) => (
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

// Composant de chargement
function Loading() {
  return <div className="text-center">Chargement en cours...</div>;
}
