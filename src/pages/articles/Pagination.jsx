import { useEffect, useState } from "react";
import { enableEnterPress, getLastPage } from "../../components/utils/api"

const Pagination = ({currentFilter, searchParams, setSearchParams}) => {
    const [lastPage, setLastPage]= useState('')
    const [pageArray, setPageArray] = useState('')

    console.log(currentFilter)

    useEffect(() => {
        async function finalPageCheck(currentFilter) {
            return await getLastPage(currentFilter)
        }
        finalPageCheck(currentFilter)
        .then((res) => {
            console.log("last page check: ", res)
            setLastPage(res)
        })
    }, [currentFilter])

    useEffect(() => {
        console.log("final page: ", lastPage)
        // Create array of p tags dynamically based on how many pages exist for the query
        let pageArray = []
        for (let index = 1; index <= lastPage; index++) {
            if (index == 1) {
                pageArray.push(<p key={index} onClick={handleClick} className="enter-press disabled-link">1</p>)
            } else {
                pageArray.push(<p key={index} onClick={handleClick} className="enter-press clickable-page">{index}</p>)
            }
        
        }
        setPageArray(pageArray)
    }, [lastPage])

    const handleClick = (event) => {
        // Remove the disabled link then apply clickable
        const disabledElement = document.getElementsByClassName("disabled-link")[0];
        disabledElement.classList.remove('disabled-link')
        disabledElement.classList.add('clickable-page')

        // Change the search filter to get the correct page
        // Copy existing queries to avoid mutation, and set search parameters
        const newParams = new URLSearchParams(searchParams);
        // Set the topic query
        newParams.set('p', event.target.innerHTML);
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