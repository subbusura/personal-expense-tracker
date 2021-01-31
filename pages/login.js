import Link from "next/link";

export default function Login() {
  return (
    <>
      <h2> Welcome to login page</h2>

      <Link href={"/"}> Go back !</Link>
    </>
  );
}
