import { useEffect, useState } from "react";
import { enableEnterPress, getLastPage } from "../../components/utils/api"
import { useSearchParams } from "react-router-dom";

const Pagination = ({currentFilter, searchParams, setSearchParams}) => {
    const [lastPage, setLastPage]= useState('')
    const [pageArray, setPageArray] = useState('')

    useEffect(() => {
        async function finalPageCheck(currentFilter) {
            const res = await getLastPage(currentFilter)
            setLastPage(res)
        }

        finalPageCheck(currentFilter)

    }, [currentFilter])

    useEffect(() => {
        console.log("thinks last page is: ", lastPage)
        // Create array of p tags dynamically based on how many pages exist for the query
        let pageTags = []
        // If no page search param, make 1 the disabled and generate the rest
        if (!currentFilter.p) {
            pageTags.push(<p key={1} onClick={handleClick} className="enter-press disabled-link">1</p>)
            for (let index = 2; index <= lastPage; index++) {
                pageTags.push(<p key={index} onClick={handleClick} className="enter-press clickable-page">{index}</p>)            }
        } else {
            // Otherwise make the current page the disabled one
            for (let index = 1; index <= lastPage; index++) {
                // Coerce the value from string to integer
                if (index == currentFilter.p) {
                    pageTags.push(<p key={index} onClick={handleClick} className="enter-press disabled-link">{index}</p>)
                } else {
                    pageTags.push(<p key={index} onClick={handleClick} className="enter-press clickable-page">{index}</p>)
                }
            }
        }
        setPageArray(pageTags)
    }, [lastPage, searchParams])

    const handleClick = (event) => {
        // Remove the disabled link then apply clickable
        const disabledElement = document.getElementsByClassName("disabled-link")[0];
        disabledElement.classList.remove('disabled-link')
        disabledElement.classList.add('clickable-page')

        // Change the search filter to get the correct page
        // Copy existing queries to avoid mutation, and set search parameters
        const newParams = new URLSearchParams(searchParams);
        console.log("new params", newParams.toString())
        // Set the topic query
        newParams.set('p', event.target.textContent);
        setSearchParams(newParams);  

        // Remove clickable class from target then apply disabled link
        event.target.classList.remove('clickable-page')
        event.target.classList.add('disabled-link')
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