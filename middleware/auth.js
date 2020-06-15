export default function (context) {
  if (!context.store.state.user.auth || context.store.state.user.userId !== context.route.params.userId) {
    context.error({
      message: 'あれ？まだログインしていないようです',
      statusCode: 403
    })
  }
}
