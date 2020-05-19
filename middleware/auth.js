export default function ({ store, error }) {
  // ユーザーが認証されていないとき
  if (!store.state.user.auth) {
    error({
      message: 'あれ？まだログインしていないようです',
      statusCode: 403
    })
  }
}
