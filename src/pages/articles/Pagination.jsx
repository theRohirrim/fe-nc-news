import { useEffect, useState } from "react";
import { enableEnterPress, getLastPage } from "../../components/utils/api"
import { useSearchParams } from "react-router-dom";

const Pagination = ({currentFilter, searchParams, setSearchParams}) => {
    const [lastPage, setLastPage]= useState('')
    const [pageArray, setPageArray] = useState('')
    const [currentPage, setCurrentPage] = useState(currentFilter.p)

    useEffect(() => {
        async function finalPageCheck(currentFilter) {
            const res = await getLastPage(currentFilter)
            setLastPage(res)
        }

        finalPageCheck(currentFilter)

    }, [currentFilter])

    useEffect(() => {
        // Create array of p tags dynamically based on how many pages exist for the query
        let pageTags = []

        // Create list of page tags
        for (let i = 1; i <= lastPage; i++) {
            console.log(currentFilter.p, i)
            pageTags.push(<p key={i} onClick={handleClick} className={`enter-press ${currentFilter.p === i.toString() ? 'disabled-link' : 'clickable-page'}`}>{i}</p>)
    
        }
        setPageArray(pageTags)
    }, [lastPage, searchParams])

    const handleClick = (event) => {
        // Change the search filter to get the correct page
        // Copy existing queries to avoid mutation, and set search parameters
        const newParams = new URLSearchParams(searchParams);
        // Set the topic query
        newParams.set('p', event.target.textContent);
        setSearchParams(newParams);  

        // Set current page to the one that was clicked
        setCurrentPage(event.target.value)
    }

    //enable buttons to be accessibly pressed with enter key
    enableEnterPress();

    return (
        <div id="pagination">
            {pageArray}
        </div>
    )
}

export default Pagination