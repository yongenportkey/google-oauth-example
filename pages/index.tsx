import { useSession, signIn, signOut } from "next-auth/react";
import { set_nonce } from "./api/auth/[...nextauth]";

export default function Home() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  if (status === "loading") {
    return <p>Hang on there...</p>;
  }

  if (status === "authenticated") {
    return (
      <>
        <p>Signed in as {userEmail}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      <p>Not signed in.</p>
      <button onClick={() => {
        set_nonce('4242424242424242424242424242424242424242424242424242424242424242');
        signIn("google");
      } }>Sign in</button>
    </>
  );
}
