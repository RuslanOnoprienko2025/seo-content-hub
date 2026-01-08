export const GET = async ({ redirect }) => {
  const client_id = import.meta.env.GITHUB_CLIENT_ID;

  if (!client_id) {
    return new Response("Error: GITHUB_CLIENT_ID is not defined", { status: 500 });
  }

  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user`;
  
  // Используем встроенный метод Astro для надежности
  return redirect(url, 302);
};
