export const GET = async ({ locals, redirect }) => {
  // 1. Пытаемся взять из Cloudflare Runtime (самый надежный способ для сервера)
  // 2. Если его нет, пробуем import.meta.env (на случай локальной разработки)
  const client_id = locals.runtime?.env?.GITHUB_CLIENT_ID || import.meta.env.GITHUB_CLIENT_ID;

  if (!client_id) {
    console.error("Auth Error: GITHUB_CLIENT_ID is missing");
    return new Response("Error: GITHUB_CLIENT_ID is not defined in Cloudflare Environment", { status: 500 });
  }

  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user`;
  
  return redirect(url, 302);
};
