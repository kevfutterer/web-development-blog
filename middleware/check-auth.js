export default function (context) {
  console.log('Check Auth Middleware');
  context.store.dispatch('initAuth', context.req);
}