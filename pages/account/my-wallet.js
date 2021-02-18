import { getSession } from "next-auth/client";

export default function MyWallet() {
  return <>Show My Wallet Details</>;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login?return=my-wallet"
      }
    };
  }

  return {
    props: {
      user: session
    }
  };
}
