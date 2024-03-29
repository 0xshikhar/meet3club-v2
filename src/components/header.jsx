import React, { useEffect, useState } from "react";
import { Outlet, NavLink, redirect, useNavigate } from "react-router-dom";
import Logo from '../static/meet3club.png'
import { ethers } from 'ethers';
// import { Contract, providers } from "ethers";
// import wallet from "./wallet";
import SocialLogin from "@biconomy/web3-auth";
import { useAccount } from "wagmi";
import "@biconomy/web3-auth/dist/src/style.css"


export default function Header() {
    const { address1 } = useAccount();
    const navigate = useNavigate();
    const [BiconomyAccount, setBiconomyAccount] = useState([]);

    const handleLogin = async () => {
        try {
            // init wallet
            const socialLoginSDK = new SocialLogin();
            await socialLoginSDK.init("0x80001"); // Enter the network id in init() parameter

            // socialLoginSDK.showConnectModal();

            // show connect modal
            socialLoginSDK.showWallet();

            if (!socialLoginSDK?.web3auth?.provider) return;
            const provider = new ethers.providers.Web3Provider(
                socialLoginSDK.provider
            );
            const accounts = await provider.listAccounts();
            console.log("EOA address", accounts);
            setBiconomyAccount(accounts);
            socialLoginSDK.hideWallet();
            navigate("/meeting");
        } catch (err) {
            console.log(err);
        }
    };

    // const Disconnect = async () => { };

    return <>

        <nav className="bg-black px-2 sm:px-4 py-2.5 dark:bg-black fixed w-full z-20 top-0 left-0 ">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                {/* <a href= className="flex items-center">
                
                </a> */}
                <img src={Logo} width={250} height={100} alt="meet3club logo" />
                {/* <Image
                    src={Logo}
                    alt="Picture of the author"
                    width={250}
                    height={100}
                /> */}
    
                {/* <img src={Logo} className="h-6 mr-3 sm:h-9" */}
                <div className="flex md:order-2">
                    <button type="button" onClick={handleLogin} className="text-white bg-purple-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Connect Wallet </button>
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                {/* <p>Connected as: {account}</p> */}
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-black dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <NavLink to="/" className="block py-2 pl-3 pr-4 text-white bg-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white" >Home</NavLink>
                        </li>

                        <li>
                            <NavLink to="/meeting" className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Meeting</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <Outlet />

    </>
}