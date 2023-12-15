import Select from "react-select"
import { getTopics } from "../../components/utils/api"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ArticleFilter = ({ searchParams, setSearchParams }) => {
    const [topicOptions, setTopics] = useState([])

    const sortByOptions = [
        {value: 'created_at', label: 'date'},
        {value: 'votes', label: 'votes'},
        {value: 'comment_count', label: 'comments'}
    ]

    const orderOptions = [
        {value: 'asc', label: 'ascending'},
        {value: 'desc', label: 'descending'}
    ]

    // Default options on select dropdowns will be what the search params are or just default search results
    const [selectDefaults, setDefaults] = useState({
        topicDefault: {value: searchParams.get('topic'), label: searchParams.get('topic') ? searchParams.get('topic') : 'all'},

        sortByDefault: {value: searchParams.get('sort_by'), label: searchParams.get('sort_by') ? sortByOptions.find((obj) => obj.value === searchParams.get('sort_by')).label : 'date'},

        orderDefault: {value: searchParams.get('order'), label: searchParams.get('order') ? orderOptions.find((obj) => obj.value === searchParams.get('order')).label : 'descending'}
    })
    // Navigate to the correct url with params when filters are changed
    const navigate = useNavigate();

    // Get topics to apply as options for the dropdown select
    useEffect(() => {
        getTopics()
        .then((topicsData) => {
            const topics = topicsData.topics.map((topic) => {
                return {value: topic.slug, label: topic.slug}
            })
            setTopics([{value: '', label: 'all'}, ...topics])
        })
        .then(() => {
            // Upon change to search parameters in dependancy array, reset defaults for the select options
            setDefaults({
                topicDefault: {value: searchParams.get('topic'), label: searchParams.get('topic') ? searchParams.get('topic') : 'all'},
        
                sortByDefault: {value: searchParams.get('sort_by'), label: searchParams.get('sort_by') ? sortByOptions.find((obj) => obj.value === searchParams.get('sort_by')).label : 'date'},
        
                orderDefault: {value: searchParams.get('order'), label: searchParams.get('order') ? orderOptions.find((obj) => obj.value === searchParams.get('order')).label : 'descending'}
            })
        })
        
    }, [searchParams])

    const handleTopicChange = (selectedOption) => {
        // If topic is all, navigate to home page
        if (selectedOption.value === '') {
            navigate('/')
        } else {    
            // Copy existing queries to avoid mutation, and set search parameters
            const newParams = new URLSearchParams(searchParams);
            // Set the topic query
            newParams.set('topic', selectedOption.value);
            setSearchParams(newParams);        
        }
    };

    const handleSortChange = (selectedOption) => {
        console.log(selectedOption)
        // Copy existing queries to avoid mutation, and set search parameters
        const newParams = new URLSearchParams(searchParams);
        
        if (['date', 'votes', 'comments'].includes(selectedOption.label)) {
            // Set the topic query
            newParams.set('sort_by', selectedOption.value);

            // Set order to desc if param does not exist
            if (!newParams.get('order')) newParams.set('order', 'desc')

            setSearchParams(newParams); 
        }
        if (['ascending', 'descending'].includes(selectedOption.label)) {
            console.log("recognises label")
            // Set the topic query
            newParams.set('order', selectedOption.value);
            setSearchParams(newParams); 
        }
    }

    return (
        <div id="article-filter">
            <div id="topic-select-container">
                <h3>Topic</h3>
                <Select 
                id="topic-dropdown" 
                onChange={handleTopicChange} 
                options={topicOptions}
                defaultValue={selectDefaults.topicDefault} 
                />
            </div>
            <div id="sort-select-container">
                <h3>Sort By</h3>
                <div id="sort-dropdown-container">
                    <Select 
                    id="sort-by-dropdown"
                    onChange={handleSortChange}
                    options={sortByOptions}
                    defaultValue={selectDefaults.sortByDefault}
                    />
                    <Select 
                    id="order-dropdown"
                    onChange={handleSortChange}
                    options={orderOptions}
                    defaultValue={selectDefaults.orderDefault}
                    />
                </div>
            </div>
        </div>
    )
}

export default ArticleFilter