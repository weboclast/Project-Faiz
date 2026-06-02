import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import { BagIcon, CloseIcon, DownIcon, SearchIcon } from '../Icon/Icon'
import { NavLink } from 'react-router-dom'
import { insforge } from '../../insforge'

const Navbar = () => {
    const dataSearch = [
        "Shirts",
        "Skirts",
        "Jeans",
        "Casual",
        "Pants",
        "Coats",
        "Sneakers",
    ]

    const [toggleSearch, settoggleSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const debounceTimeoutRef = useRef(null);

    const [ToogleMenuResponsive, setToogleMenuResponsive] = useState(false);
    const [userName, setUserName] = useState(null); // display name for trigger
    const [userEmail, setUserEmail] = useState(null); // account email for dropdown group

    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);
    const userMenuButtonRef = useRef(null);

    const [authInitializing, setAuthInitializing] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadCurrentUser = async () => {
            try {
                const { data, error } = await insforge.auth.getCurrentUser();
                if (!isMounted) return;

                if (error) {
                    console.error('Failed to load current user:', error);
                }

                const user = data?.user ?? null;

                const displayName =
                    user?.user_metadata?.display_name ||
                    user?.user_metadata?.full_name ||
                    user?.user_metadata?.name;

                setUserName(user ? (displayName || user.email) : null);
                setUserEmail(user ? (user.email || null) : null);
            } finally {
                if (isMounted) setAuthInitializing(false);
            }
        };

        const handleAuthChange = () => {
            loadCurrentUser();
        };

        loadCurrentUser();
        window.addEventListener('insforge-auth-change', handleAuthChange);

        return () => {
            isMounted = false;
            window.removeEventListener('insforge-auth-change', handleAuthChange);
        };
    }, []);

    const handleSearchChange = async (query) => {
        setSearchQuery(query);

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        debounceTimeoutRef.current = setTimeout(async () => {
            try {
                setSearchLoading(true);
                const { data, error } = await insforge.db.rpc('search_products_by_keywords', {
                    keyword: query
                });

                if (error) {
                    console.error('Search error:', error);
                    setSearchResults([]);
                    return;
                }

                setSearchResults(data || []);
            } catch (err) {
                console.error('Search request failed:', err);
                setSearchResults([]);
            } finally {
                setSearchLoading(false);
            }
        }, 300);
    };

    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!userMenuOpen) return;

            const target = e?.target;
            const menuEl = userMenuRef.current;
            const buttonEl = userMenuButtonRef.current;

            if (!menuEl || !buttonEl) return;

            if (menuEl.contains(target)) return;
            if (buttonEl.contains(target)) return;

            setUserMenuOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [userMenuOpen]);

    return (
        <Fragment>
            <div className={"fixed h-full w-full bg-white z-[99] pt-[100px] menuMobile " + (ToogleMenuResponsive ? "active" : "")}>
                <Container className='h-full'>
                    <div className="flex flex-wrap w-full h-full">
                        <ul className='list-none p-0 m-0 flex items-center flex-wrap gap-2 text-[20px] w-full'>
                            <li className='w-full'>
                                <a href="#!" className='font-medium text-black'>Menu</a>
                            </li>
                            <li className='w-full'>
                                <NavLink to="/product" className='font-medium text-black'>Product</NavLink>
                            </li>
                            <li className='w-full'>
                                <NavLink to="/tracking" className='font-medium text-black'>Order Tracking</NavLink>
                            </li>
                            <li className='w-full'>
                                <NavLink to="/blog" className='font-medium text-black'>Blog</NavLink>
                            </li>
                            <li className='w-full'>
                                <a href="#!" className='font-medium text-black'>Contact Us</a>
                            </li>
                            <li className='w-full'>
                                <NavLink to="/address" className='font-medium text-black'>Address</NavLink>
                            </li>
                        </ul>
                        <div className="self-end w-full">
                            {authInitializing ? null : userName ? (
                                <NavLink to="/" className='inline-block cursor-pointer font-medium text-[14px] text-orange !border-orange btnClass hover:bg-orange hover:text-white'>
                                    {userName}
                                </NavLink>
                            ) : (
                                <NavLink to="/sign-in" className='inline-block cursor-pointer font-medium text-[14px] text-orange !border-orange btnClass hover:bg-orange hover:text-white'>
                                    Login
                                </NavLink>
                            )}
                        </div>
                    </div>
                </Container>
            </div>


            {/* start:search */}
            <div onClick={() => settoggleSearch(false)} className={"fixed z-[79] w-full h-full bgDropPopup left-0 transition-all duration-500 " + (toggleSearch ? "top-0" : "-top-[100%]")}></div>
            <div className={"fixed w-full left-0 z-[80] pt-[100px] bg-white pb-4 transition-all duration-500 " + (toggleSearch ? "top-0" : "-top-[100%]")}>
                <Container>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-full h-[48px] rounded-full border border-solid border-[#E5E5E5] flex items-center gap-2 px-2">
                            <SearchIcon />
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className='fieldInput w-full !border-none hover:!border-none focus:!border-none active:!border-none !px-1 text-[12px] lg:text-[14px]' 
                                placeholder='Search...' 
                            />
                        </div>
                        <div onClick={() => settoggleSearch(false)} className="cursor-pointer w-[48px] h-[48px] flex items-center justify-center rounded-full border border-solid border-[#E5E5E5] shrink-0">
                            <CloseIcon />
                        </div>
                    </div>
                    <div className="">
                        <h4 className='font-normal text-[14px] lg:text-[16px] mb-3'>
                            {searchQuery ? (searchLoading ? 'Loading results...' : 'Search Results') : 'Recent Search'}
                        </h4>
                        <div className="flex items-center flex-wrap gap-2">
                            {searchQuery && searchResults.length > 0 ? (
                                searchResults.map((product) => {
                                    return (
                                        <div 
                                            key={product.id} 
                                            className="px-3 py-[5px] cursor-pointer border border-solid border-[#E5E5E5] rounded-2xl flex items-center gap-2 hover:border-orange transition-colors"
                                        >
                                            <div className="flex flex-col gap-1">
                                                <div className="text-[12px] font-medium">{product.name}</div>
                                                <div className="text-[11px] text-[#737373]">${product.price}</div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : searchQuery && searchResults.length === 0 && !searchLoading ? (
                                <div className="text-[12px] text-[#737373]">No products found</div>
                            ) : !searchQuery ? (
                                dataSearch.map((obj) => {
                                    return <div key={obj} className="px-3 py-[5px] cursor-pointer border border-solid border-[#E5E5E5] rounded-2xl flex items-center gap-2">{obj} <CloseIcon width={20} height={20} /></div>
                                })
                            ) : null}
                        </div>
                    </div>
                </Container>
            </div>
            {/* end:search */}

            <div className='fixed py-4 bg-white w-full z-[999] left-0 top-0'>
                <Container className='relative flex items-center'>
                    <div onClick={() => setToogleMenuResponsive(!ToogleMenuResponsive)} className={"relative px-1 py-1 barIcon w-[30px] h-[30px] cursor-pointer md:hidden " + (ToogleMenuResponsive ? "active" : "")}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <ul className='list-none p-0 m-0 hidden md:flex items-center gap-4 text-[14px] lg:text-[16px]'>
                        <li>
                            <NavLink to="/" className='font-medium text-black'>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/product" className='font-medium text-black'>Product</NavLink>
                        </li>
                        <li>
                            <NavLink to="/blog" className='font-medium text-black'>Blog</NavLink>
                        </li>
                        <li>
                            <a href='#!' className='font-medium text-black'>Contact Us</a>
                        </li>
                    </ul>

                    <NavLink to="/" className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <img src="./../images/logo.png" alt="" />
                    </NavLink>

                    <div className="ml-auto flex items-center gap-2 md:gap-3">
                        <div className="w-[40px] md:w-[48px] h-[40px] md:h-[48px] rounded-full border border-solid border-[#E5E5E5] flex items-center justify-center cursor-pointer" onClick={() => settoggleSearch(!toggleSearch)}>
                            <SearchIcon />
                        </div>
                        <NavLink to="/cart" className="w-[40px] md:w-[48px] h-[40px] md:h-[48px] rounded-full border border-solid border-[#E5E5E5] flex items-center justify-center">
                            <BagIcon />
                        </NavLink>

                        {userName ? (
                            <div className="relative !hidden md:!inline-block">
                                <button
                                    ref={userMenuButtonRef}
                                    type="button"
                                    onClick={() => setUserMenuOpen((v) => !v)}
                                    className='cursor-pointer font-medium text-[12px] lg:text-[14px] text-orange !border-orange btnClass hover:bg-orange hover:text-white inline-flex items-center gap-2'
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <span>{userName}</span>
                                        <span
                                            className={
                                                "transition-transform duration-200 " + (userMenuOpen ? "rotate-180" : "rotate-0")
                                            }
                                        >
                                            <DownIcon width={16} height={16} color="#F07C2E" />
                                        </span>
                                    </span>
                                </button>

                                {userMenuOpen ? (
                                    <div
                                        ref={userMenuRef}
                                        className="absolute right-0 mt-2 w-[220px] bg-white border border-solid border-[#E5E5E5] rounded-[10px] shadow-[0px_10px_30px_rgba(0,0,0,0.08)] overflow-hidden z-[1000]"
                                    >
                                        {/* Group 1 (static) */}
                                        <div className="px-4 py-3">
                                            <div className="text-[14px] lg:text-[16px] font-medium text-black">
                                                {userName}
                                            </div>
                                            <div className="text-[14px] lg:text-[16px] font-medium text-black mt-1">
                                                {userEmail}
                                            </div>
                                        </div>

                                        <div className="w-full h-[1px] bg-[#E5E5E5]" />

                                        {/* Group 2 (UI-only links) */}
                                        <div className="px-2 py-2">
                                            <button
                                                type="button"
                                                className="w-full text-left px-3 py-2 rounded-[8px] text-[14px] font-medium text-black hover:bg-[#FFF2E8] cursor-pointer"
                                                onClick={() => {}}
                                            >
                                                Orders
                                            </button>
                                            <button
                                                type="button"
                                                className="w-full text-left px-3 py-2 rounded-[8px] text-[14px] font-medium text-black hover:bg-[#FFF2E8] cursor-pointer mt-1"
                                                onClick={() => {}}
                                            >
                                                Profile
                                            </button>
                                        </div>

                                        <div className="w-full h-[1px] bg-[#E5E5E5]" />

                                        {/* Group 3 (logout) */}
                                        <div className="px-2 py-2">
                                            <button
                                                type="button"
                                                className="w-full text-left px-3 py-2 rounded-[8px] text-[14px] font-medium text-orange hover:bg-[#FFF2E8] cursor-pointer"
                                                onClick={async () => {
                                                    try {
                                                        // Best-effort across SDK versions: try common sign-out method names
                                                        const auth = insforge?.auth;
                                                        if (!auth) throw new Error('Missing insforge.auth');

                                                        if (typeof auth.signOut === 'function') {
                                                            await auth.signOut();
                                                        } else if (typeof auth.logout === 'function') {
                                                            await auth.logout();
                                                        } else if (typeof auth.deleteSession === 'function') {
                                                            await auth.deleteSession();
                                                        } else if (auth.session && typeof auth.session.destroy === 'function') {
                                                            await auth.session.destroy();
                                                        } else {
                                                            throw new Error('No known sign-out method found on insforge.auth');
                                                        }
                                                    } catch (e) {
                                                        console.error('Logout failed:', e);
                                                    } finally {
                                                        setUserMenuOpen(false);
                                                        setUserName(null);
                                                        setUserEmail(null);
                                                        window.dispatchEvent(new Event('insforge-auth-change'));
                                                    }
                                                }}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        ) : (
                            <NavLink to="/sign-in" className='!hidden md:!inline-block cursor-pointer font-medium text-[12px] lg:text-[14px] text-orange !border-orange btnClass hover:bg-orange hover:text-white'>Login</NavLink>
                        )}
                    </div>
                </Container>
            </div>
        </Fragment>
    )
}

export default Navbar
