import Link from "next/link";

function Navbar() {
  return (
    <div>
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </div>
  );
}

export default Navbar;
