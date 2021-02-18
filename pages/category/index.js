import { getSession } from "next-auth/client";
import AppLayout from "./../../layouts/LayoutApp";

export default function Category() {
  return <AppLayout>Show Category</AppLayout>;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login?return=category"
      }
    };
  }

  return {
    props: {
      user: session
    }
  };
}
