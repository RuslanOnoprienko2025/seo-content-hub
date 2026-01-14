export const onRequest = async (context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // Если путь не заканчивается на слеш и это не файл (нет точки)
  if (!pathname.endsWith('/') && !pathname.includes('.')) {
    const newUrl = new URL(context.request.url);
    newUrl.pathname = pathname + '/';
    
    // Делаем постоянный 301 редирект
    return Response.redirect(newUrl.toString(), 301);
  }

  return next();
};
