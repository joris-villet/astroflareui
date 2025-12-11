export function onRequest(context: any, next: any) {
  // console.log(context.url.origin);

  context.locals.env = context.locals.runtime.env;

  // renvoie une réponse (Response) ou le résultat de l'appel à `next()`
  return next();
}
