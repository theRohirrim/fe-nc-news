import Select from "react-select"
import { getArticles, getTopics } from "../../components/utils/api"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ArticleFilter = ({ searchParams, setSearchParams }) => {
    const [topicOptions, setTopics] = useState([])
    const [topicSelected, setTopicSelected] = useState(null)
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
        setTopicSelected(selectedOption.value);

        // If topic is all, navigate to home page
        if (selectedOption.value === '') {
            navigate('/')
        } else {
            //Navigate to the new url
            navigate(`/articles?topic=${selectedOption.value}`)
    
            // copy existing queries to avoid mutation
            const newParams = new URLSearchParams(searchParams);
            // set the topic query
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
                options={[{value: '', label: 'All'}, ...topicOptions]}
                defaultValue={{value: '', label: 'All'}} 
                />
            </div>
            <div id="sort-select-container">
                <h3>Sort By</h3>
                <div id="sort-dropdown-container">
                    <Select 
                    id="sort-by-dropdown"

                    />
                    <Select id="order-dropdown"/>
                </div>
            </div>
        </div>
    )
}

export default ArticleFilter