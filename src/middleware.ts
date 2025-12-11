export function onRequest(context: any, next: any) {
  // console.log(context.params);

  context.locals.env = context.locals.runtime.env;

  // renvoie une réponse (Response) ou le résultat de l'appel à `next()`
  return next();
}
