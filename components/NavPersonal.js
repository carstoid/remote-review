import Link from 'next/link';

const NavPersonal = (props) => (
  <div className="wrapper">
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/archive">
      <a>Archive</a>
    </Link>
    <Link href="/chat">
      <a>Chat</a>
    </Link>
    <Link href="/stream">
      <a>Stream</a>
    </Link>
    <Link href="/register">
      <a>Register</a>
    </Link>
    <span>{props.numUsers} logged in</span>
    <span style={props.currentUser.style}>Hello, {props.currentUser.name}</span>
    <style jsx>{`
      .wrapper {
        border-bottom: 2px solid black;
      }
      a {
        color: black;
        text-decoration: none;
        font-weight: bold;
        display: inline-block;
        padding: 1em;
      }
    `}</style>
  </div>
);

export default NavPersonal;