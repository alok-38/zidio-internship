import Header from "../header";

function CommonLayout({ children }) {
  return (
    <div className="mx-auto mx-w-7xl p-6 lg:px-8">
      {/* header */}
	  <Header />
      {/* main */}
      <main>{children}</main>
    </div>
  );
}

export default CommonLayout;
