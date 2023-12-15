import { Link } from "react-router-dom"

const Nav = () => {
    return (
        <nav>
            <Link to="/?sort_by=created_at&order=desc"><p>Home</p></Link>
        </nav>
    )
}

export default Nav