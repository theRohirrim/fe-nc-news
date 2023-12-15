import { Link } from "react-router-dom"

const Header = ({setNumber}) => {
    return (
        <div id="header">
            <h1>NC News</h1>
            <Link 
            id="home-button" 
            to="/?sort_by=created_at&order=desc"
            onClick={() => {
                setNumber((currentNumber) => {
                    return currentNumber + 1;
                })
            }}><p>Home</p></Link>
        </div>
    )
}

export default Header