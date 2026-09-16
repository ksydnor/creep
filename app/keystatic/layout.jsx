import KeystaticApp from "./keystatic";

// The editor owns its own document, like the admin panel it replaces.
export default function Layout() {
  return (
    <html lang="en">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
