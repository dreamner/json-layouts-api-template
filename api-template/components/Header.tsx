// Header.tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Chip, Button, Typography } from "@mui/material";
import { Home } from "@mui/icons-material";
import AccountMenu from "./AccountMenu";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <div className="logo">
        <Typography variant="h5">DREAMVILLE</Typography>
      </div>
      <Link href="/">
        <a className="bold" data-active={isActive("/")}>
          <Chip icon={<Home />} label="Home" />
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }
        .logo {
          text-align: center;
        }
        a {
          text-decoration: none;
          color: var(--geist-foreground);
          display: inline-block;
        }

        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = null;

  if (status === "loading") {
    left = (
      <div className="left">
        <div className="logo">
          <Typography variant="h5">DREAMVILLE</Typography>
        </div>
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            <Chip icon={<Home />} label="Home" />
          </a>
        </Link>

        <style jsx>{`
          .bold {
            font-weight: bold;
          }
          .logo {
            text-align: center;
          }
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin">
          <Button disableElevation variant="contained" data-active={isActive("/signup")}>
            Sign in
          </Button>
        </Link>
        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <div className="logo">
          <Typography variant="h5">DREAMVILLE</Typography>
        </div>
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            <Chip icon={<Home />} label="Home" />
          </a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }
          .logo {
            text-align: center;
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <AccountMenu />
        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            border: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;
