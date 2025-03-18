import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { faBars, faCaretDown, faGlobe, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons"

import menuItems from "../../../data/mocks/Header/menuItems"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "../../../components/Image"
import config from "../../../config"
import imgUtils from "../../../assets/images/utils"
import Button from "../../../components/Button"
import SearchModal from "./SearchModal"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleOpenSearch = () => {
    setIsSearchOpen(true)
  }

  const handleCloseSearch = () => {
    setIsSearchOpen(false)
  }

  return (
    <>
      <div className="h-[96px] w-full drop-shadow-sm bg-white fixed top-0 z-10">
        <div
          className="flex items-center justify-between w-full h-full max-w-6xl mx-auto"
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <div className="flex gap-10 mx-5">
            <Link to={config.routes.home}>
              <Image
                src={imgUtils.logoTourX}
                alt="Logo"
                className="w-[130px] h-[96px] object-cover select-none"
                onClick={handleScrollTop}
              />
            </Link>
            {/* Desktop */}
            <div className="items-center hidden gap-5 text-base font-semibold lg:flex">
              {menuItems.map((item) => (
                <NavLink
                  to={item.to}
                  key={item.id}
                  className={({ isActive }) =>
                    `select-none text-center flex items-center justify-center h-full transition duration-300 border-b-3 min-w-[80px] 
                                    ${
                                      isActive
                                        ? "text-primary-base border-primary-base border-b-3"
                                        : "text-black border-transparent"
                                    }
                                    hover:text-primary-base hover:border-primary-base`
                  }
                  onClick={handleScrollTop}
                >
                  {item.title}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="relative flex items-center justify-center mx-5">
            <Button className="text-2xl rounded-full cursor-pointer h-13 w-13" onClick={handleOpenSearch}>
              <FontAwesomeIcon icon={faMagnifyingGlass} beat />
            </Button>
            <Button className="text-2xl rounded-full cursor-pointer h-13 w-13">
              <FontAwesomeIcon icon={faUser} />
            </Button>
            <button className="relative hidden text-2xl rounded-full cursor-pointer w-13 h-13 lg:block">
              <FontAwesomeIcon icon={faGlobe} />
              <FontAwesomeIcon
                className="absolute top-1/2 -right-1 -translate-y-1/2 ml-1.5 text-xl"
                icon={faCaretDown}
              />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-3xl rounded-full cursor-pointer w-13 h-13 lg:hidden"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <div
            className={`shadow-2xl border-t-1 border-t-gray-300 absolute gap-3 xl:hidden top-24 left-0 w-full bg-white flex flex-col items-center font-semibold text-lg transform transition-transform ${
              isMenuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
            }`}
            style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
          >
            {/* Mobible */}
            {menuItems.map((item) => (
              <Link
                to={item.to}
                key={item.id}
                className="w-full p-4 text-center hover:bg-primary-base hover:text-black"
                onClick={() => {
                  setIsMenuOpen(false)
                  handleScrollTop()
                }}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={handleCloseSearch} />
    </>
  )
}

export default Header