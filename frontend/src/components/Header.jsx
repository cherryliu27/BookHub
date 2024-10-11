import { useState } from "react"
import "./Header.css"

export default function Header(){

    // Functions to display and hide sidebar menus
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const showSidebar = (e) => {
        e.preventDefault();
        setSidebarVisible(!sidebarVisible)
    }

    const closeSidebar = (e) => {
        e.preventDefault();
        setSidebarVisible(!sidebarVisible)
    }

    return (
            <nav>
                <ul class="sidebar" style={{display: sidebarVisible? 'flex' : 'none'}}> 
                    <li onClick={closeSidebar}>
                        <a href="/" ><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></a></li>
                    <li><a href="/">Home</a></li>
                    <li><a href="/books">Books</a></li>
                    <li><a href="/add">Add Book</a></li>
                </ul>
                <ul>
                    <li class="logo"><a href="/">BOOKHUB</a></li>
                    <li><a class="hideOnMobile" href="/">Home</a></li>
                    <li><a class="hideOnMobile" href="/books">Books</a></li>
                    <li><a class="hideOnMobile" href="/add">Add Book</a></li>
                    <li class="menubtn" onClick={showSidebar}>
                    {/* // eslint-disable-next-line */}
                    <a href="/"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></a></li>
                </ul>
            </nav>
    )
}