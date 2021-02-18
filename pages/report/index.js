import AppLayout from "./../../layouts/LayoutApp";
import { getSession } from "next-auth/client";

export default function MyReport() {
  return <AppLayout>Show Report</AppLayout>;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login?return=report"
      }
    };
  }

  return {
    props: {
      user: session
    }
  };
}
