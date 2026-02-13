import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 60px)" }}>
        {children}
      </main>
    </div>
  );
}

export default Layout;
