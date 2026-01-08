  export const GET = async ({ url, locals }) => {
  const code = url.searchParams.get('code');
  const runtime = locals.runtime;
  
  const client_id = runtime.env.GITHUB_CLIENT_ID;
  const client_secret = runtime.env.GITHUB_CLIENT_SECRET;

  // ... дальше ваш код запроса к GitHub (fetch), использующий эти переменные
}
  
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "user-agent": "cloudflare-pages-auth",
      accept: "application/json",
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code,
    }),
  });
  
  const result = await response.json();
  
  if (result.error) {
    return new Response(JSON.stringify(result), { status: 400 });
  }
  
  return new Response(
    `<html><body><script>
    (function() {
      function recieveMessage(e) {
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify({
            token: result.access_token,
            provider: "github",
          })}',
          e.origin
        );
      }
      window.addEventListener("message", recieveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
    </script></body></html>`,
    { headers: { "content-type": "text/html" } }
  );
};
