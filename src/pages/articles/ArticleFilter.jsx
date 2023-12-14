import Select from "react-select"
import { getTopics } from "../../components/utils/api"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ArticleFilter = ({ currentFilter, searchParams, setSearchParams }) => {
    const [topicOptions, setTopics] = useState([])
    const [selectDefaults, setDefaults] = useState({
        topicDefault: {value: searchParams.get('topic'), label: searchParams.get('topic') ? searchParams.get('topic') : 'all'}
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
            console.log("recognises label")
            // Set the topic query
            newParams.set('sort_by', selectedOption.value);
            setSearchParams(newParams); 
        }
        if (['ascending', 'descending'].includes(selectedOption.label)) {
            console.log("recognises label")
            // Set the topic query
            newParams.set('order', selectedOption.value);
            setSearchParams(newParams); 
        }
    }
    
    const sortByOptions = [
        {value: 'created_at', label: 'date'},
        {value: 'votes', label: 'votes'},
        {value: 'comment_count', label: 'comments'}
    ]

    const orderOptions = [
        {value: 'asc', label: 'ascending'},
        {value: 'desc', label: 'descending'}
    ]

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
                    defaultValue={{value: 'created_at', label: 'date'}}
                    />
                    <Select 
                    id="order-dropdown"
                    onChange={handleSortChange}
                    options={orderOptions}
                    defaultValue={{value: 'asc', label: 'ascending'}}
                    />
                </div>
            </div>
        </div>
    )
}

export default ArticleFilter