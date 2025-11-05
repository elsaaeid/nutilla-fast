export function getServerSideProps() {
  return {
    redirect: {
      destination: '/admin/login',
      permanent: false,
    },
  }
}

export default function LoginRedirect() {
  return null
}
