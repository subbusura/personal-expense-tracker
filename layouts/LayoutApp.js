import Link from "next/link";
import { signOut, useSession } from "next-auth/client";

const mainMenu = [
  {
    name: "Wallet",
    url: "/wallet",
    icon: "fa fa-money",
    className: ""
  },
  {
    name: "Budget",
    url: "/budget",
    icon: "fa fa-shopping-basket",
    className: ""
  },
  {
    name: "Category",
    url: "/category",
    icon: "fa fa-tags",
    className: ""
  },
  {
    name: "Report",
    url: "/report",
    icon: "fa fa-pie-chart",
    className: ""
  }
];

export default function LayoutApp({ children }) {
  const handleLogout = async (e) => {
    e.preventDefault();

    const response = await signOut({
      redirect: true
    });

    console.log("LOG LOGOUT", response);
  };

  return (
    <div className={"h-100"}>
      <div id="app-container" className="menu-default sub-hidden">
        <div className={"navbar fixed-top"}>
          <div className={"d-flex align-items-center navbar-left"}>
            <div className="menu-button d-none d-md-block">
              <i className="fa fa-bars" aria-hidden="true"></i>
            </div>
            <div className="menu-button-mobile d-xs-block d-sm-block d-md-none">
              <i className="fa fa-bars" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div className="sidebar">
          <div className="main-menu">
            <div className={"scroll"}>
              <div className="scrollbar-container ps ps--active-y">
                <ul className="list-unstyled nav flex-column">
                  {mainMenu.map((menu, index) => {
                    return (
                      <li className={"nav-item"} key={index}>
                        <Link href={menu.url}>
                          <a>
                            {" "}
                            <i
                              className={menu.icon}
                              aria-hidden="true"
                            ></i>{" "}
                            {menu.name}
                          </a>
                        </Link>
                      </li>
                    );
                  })}

                  <li className={"nav-item"}>
                    <Link href={"#"}>
                      <a onClick={handleLogout}>
                        {" "}
                        <i
                          className={"fa fa-sign-out"}
                          aria-hidden="true"
                        ></i>{" "}
                        Logout{" "}
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <main>
          <div className={"container-fluid"}>{children}</div>
        </main>
      </div>
    </div>
  );
}
