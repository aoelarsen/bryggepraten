import { a as auth } from './chunks/pages/_token__e20fc514.mjs';
import './chunks/index_e313af4b.mjs';

const onRequest$1 = async (context, next) => {
  context.locals.auth = auth.handleRequest(context);
  return await next();
};

function sequence(...handlers) {
  const filtered = handlers.filter((h) => !!h);
  const length = filtered.length;
  if (!length) {
    const handler = defineMiddleware((context, next) => {
      return next();
    });
    return handler;
  }
  return defineMiddleware((context, next) => {
    return applyHandle(0, context);
    function applyHandle(i, handleContext) {
      const handle = filtered[i];
      const result = handle(handleContext, async () => {
        if (i < length - 1) {
          return applyHandle(i + 1, handleContext);
        } else {
          return next();
        }
      });
      return result;
    }
  });
}

function defineMiddleware(fn) {
  return fn;
}

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
