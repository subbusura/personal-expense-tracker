import AppLayout from "./../../layouts/LayoutApp";
import { getSession } from "next-auth/client";

export default function MyWallet() {
  return <AppLayout>Show My Wallet</AppLayout>;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login?return=wallet"
      }
    };
  }

  return {
    props: {
      user: session
    }
  };
}
