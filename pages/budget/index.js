import { getSession } from "next-auth/client";
import AppLayout from "./../../layouts/LayoutApp";

export default function Budget() {
  return <AppLayout>Show My Budget</AppLayout>;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login?return=budget"
      }
    };
  }

  return {
    props: {
      user: session
    }
  };
}
