import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/Auth.service";
import { authLogout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";


function Navbar() {
  const [accountNumber, setAccountNumber] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("account Number::", accountNumber);

    if (accountNumber) {
      navigate(`/loanDetails/${accountNumber}`);
    }
  };
  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Apply Loans", path: "/applyLoan" },
    { name: "All Customers", path: "/allLoans" },
    { name: "EMI Calculate", path: "/emiCalculator" },
    { name: "Collect Payments", path: "/paymentCollection" },
    { name: "Reports", path: "/reports" },
  ];

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(authLogout());
    });
    console.log("Logout clicked");
  };

  return (
    <header className="bg-cyan-600 fixed top-0 left-0 right-0 h-16 shadow-md z-10">
      <nav className="px-4 py-3  mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <h1 className="text-white text-xl md:text-2xl font-bold hidden md:block">
          Raghava Auto lenders
        </h1>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center w-full max-w-md"
        >
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Search by Account Number"
            className="w-full px-4 py-2 rounded-l-lg border-none outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="submit"
            className="bg-white text-cyan-600 px-4 py-2 rounded-r-lg font-semibold hover:bg-gray-100"
          >
            Search
          </button>
        </form>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-white text-cyan-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 ml-4 hidden lg:block"
        >
          Logout
        </button>

        {/* Section for Mobile Navigation  */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="px-4 py-2 text-white text-4xl cursor-pointer"
          >
            {/* {`isMenuOpen ? &#8801; : &‌#215;`} */}
            &#8801;
          </button>
        </div>
      </nav>
      {/* Section for Mobile Navigation Menu */}
      <div>
        <ul
          className={`lg:hidden gap-12 text-lg block space-y-3 px-4 pt-1 pb-6 bg-gray-100 
      ${
        isMenuOpen
          ? "fixed left-0 w-full transition-all ease-in-out duration-150 shadow-lg"
          : "hidden"
      }`}
        >
          {navItems.map((item) =>
             (
              <li key={item.name} onClick={toggleMenu}>
                <NavLink
                  to={item.path}
              //     className={({ isActive }) =>
              //       `py-2 pr-4 pl-3 duration-200 border-b text-lg font-bold
              // ${
              //   isActive
              //     ? "border-primary-500 text-primary-500"
              //     : "text-gray-800"
              // }
              //   hover:text-primary-500 hover:border-primary-500`
              //     }
                  className="block py-2 px-4 text-gray-800 hover:bg-gray-200"
                >
                  {item.name}
                </NavLink>
              </li>
            ) 
          )}
          <li className="block py-2 px-4 text-gray-800 hover:bg-gray-200" onClick={handleLogout}>
          LogOut
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
