import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "@inertiajs/react";
import Cart from "./Cart";
import UserRegister from "./UserRegister";
import SearchBar from "./SearchBar";
import { useCart } from '@/Context/CartContext';

const CategoryMenu = ({ clusters }) => {
  const { totalItems } = useCart();

  const [activeClusterId, setActiveClusterId] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);

  const menuRef = useRef(null);

  /* ---------------- Sticky Logic ---------------- */
  const updateMenuHeight = useCallback(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(updateMenuHeight);
    if (menuRef.current) {
      resizeObserver.observe(menuRef.current);
      updateMenuHeight();
    }

    const onScroll = () => {
      setSticky(window.scrollY >= window.innerHeight);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [updateMenuHeight]);

  /* ---------------- Handlers ---------------- */
  const handleHover = (id) => {
    if (window.innerWidth >= 768) setActiveClusterId(id);
  };

  const handleLeave = () => {
    if (window.innerWidth >= 768) setActiveClusterId(null);
  };

  const toggleMobileCluster = (id) => {
    setActiveClusterId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {isSticky && <div style={{ height: menuHeight }} />}

      <nav
        ref={menuRef}
        onMouseLeave={handleLeave}
        className={`bg-white shadow-md transition-all duration-300 ${
          isSticky ? "fixed top-0 left-0 w-full z-30" : "relative"
        }`}
      >
        {/* ---------------- MOBILE HEADER ---------------- */}
        <div className="md:hidden flex items-center justify-between px-4 py-3">
          <button onClick={() => setShowMobileMenu(!showMobileMenu)}>☰</button>

          <Link href="/">
            <img src="/storage/images/logo.png" alt="Logo" className="h-8" />
          </Link>

          <div className="flex items-center gap-2">
            <Cart items={totalItems} />
            <UserRegister add_class="text-xl" />
          </div>
        </div>

        <div className="md:hidden px-4 pb-3">
          <SearchBar
            searchUrl="search"
            classes="w-full p-3 pl-10 rounded-xl border border-gray-300"
          />
        </div>

        {/* ---------------- MENU WRAPPER ---------------- */}
        <div className="max-w-7xl mx-auto">
          <ul
            className={`
              flex flex-col
              md:flex-row md:justify-between
              w-full
              px-4 md:px-8
              pb-4 md:pb-0
              ${showMobileMenu ? "block" : "hidden md:flex"}
            `}
          >
            {clusters.map((cluster) => (
              <li
                key={cluster.id}
                className="relative md:flex-1 md:text-center group"
                onMouseEnter={() => handleHover(cluster.id)}
                >

                {/* ---------------- CLUSTER HEADER ---------------- */}
                <div className="flex items-center justify-between md:block py-3 md:py-4">
                  {/* IMAGE + TITLE */}
                  <Link
                    href={`/${cluster.slug}`}
                    data={{ id: "cluster" }}
                    className="
                      flex items-center gap-3
                      md:flex-col md:items-center md:gap-2
                    "
                  >
                    {!isSticky && cluster.image && (
                      <img
                        src={`/storage/${cluster.image}`}
                        alt={cluster.name}
                        className="w-10 h-10 md:w-14 md:h-14
                            rounded-md object-cover
                            transition-transform duration-300 ease-out
                            group-hover:scale-110"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://placehold.co/56x56?text=${cluster.name.charAt(
                            0
                          )}`;
                        }}
                      />
                    )}

                    <span className="text-sm md:text-base font-semibold text-gray-800

      transition-transform duration-300 ease-out
      group-hover:scale-110

                    ">
                      {cluster.name}
                    </span>
                  </Link>

                  {/* PLUS / MINUS — MOBILE ONLY */}
                  {cluster.groups?.length > 0 && (
                    <button
                      type="button"
                      className="md:hidden w-8 h-8 flex items-center justify-center border rounded-full"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleMobileCluster(cluster.id);
                      }}
                    >
                      {activeClusterId === cluster.id ? "−" : "+"}
                    </button>
                  )}
                </div>

                {/* ---------------- SUB MENU ---------------- */}
                {activeClusterId === cluster.id &&
                  cluster.groups?.length > 0 && (
                    <div
                      className="
                         border rounded-lg shadow-md
                        md:absolute bg-gray-200
md:top-full
md:left-1/2
md:-translate-x-1/2
md:max-w-[90vw]
md:w-64


                        mt-2 md:mt-0
                        z-20
                      "
                    >
                      <ul className="py-2">
                        {cluster.groups.map((group) => (
                          <li key={group.id}>
                            <Link
                              href={`/${group.slug}`}
                              data={{ id: "group" }}
                              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                              onClick={() => {
                                setActiveClusterId(null);
                                setShowMobileMenu(false);
                              }}
                            >
                              {group.thumbnail ? (
                                <img
                                  src={`/storage/${group.thumbnail}`}
                                  alt={group.name}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                                  {group.name.charAt(0)}
                                </div>
                              )}
                              <span className="text-gray-700">
                                {group.name}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default CategoryMenu;