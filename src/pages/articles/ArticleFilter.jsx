import Select from "react-select"
import { getArticles, getTopics } from "../../components/utils/api"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ArticleFilter = ({ searchParams, setSearchParams }) => {
    const [topicOptions, setTopics] = useState([])
    // Navigate to the correct url with params when filters are changed
    const navigate = useNavigate();
    // Get topics to apply as options for the dropdown select
    useEffect(() => {
        getTopics()
        .then((topicsData) => {
            setTopics(topicsData.topics.map((topic) => {
                return {value: topic.slug, label: topic.slug}
            }))
        })
    }, [])

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
        
    }  

    return (
        <div id="article-filter">
            <div id="topic-select-container">
                <h3>Topic</h3>
                <Select 
                id="topic-dropdown" 
                onChange={handleTopicChange} 
                options={[{value: '', label: 'all'}, ...topicOptions]}
                defaultValue={{value: '', label: 'all'}} 
                />
            </div>
            <div id="sort-select-container">
                <h3>Sort By</h3>
                <div id="sort-dropdown-container">
                    <Select 
                    id="sort-by-dropdown"
                    onChange={handleSortChange}
                    options={[
                        {value: 'created_at', label: 'date'},
                        {value: 'votes', label: 'votes'},
                        {value: 'comment_count', label: 'comments'}
                    ]}
                    defaultValue={{value: 'created_at', label: 'date'}}
                    />
                    <Select 
                    id="order-dropdown"
                    onChange={handleSortChange}
                    options={[
                        {value: 'asc', label: 'ascending'},
                        {value: 'desc', label: 'descending'}
                    ]}
                    defaultValue={{value: 'asc', label: 'ascending'}}
                    />
                </div>
            </div>
        </div>
    )
}

export default ArticleFilter