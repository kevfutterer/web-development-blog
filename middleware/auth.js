export default function (context) {
  if (!context.store.getters.isAuthenticated) {
    console.log('Auth Middleware')
    context.redirect('/admin/auth')
  }
}