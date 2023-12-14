import Select from "react-select"
import { getArticles, getTopics } from "../../components/utils/api"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ArticleFilter = ({currentFilter, setArticles, searchParams, setSearchParams}) => {
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

        getArticles(currentFilter)
        .then((res) => {
            setArticles(res.articles)
        })

    }, [searchParams])

    const handleTopicChange = (selectedOption) => {
        console.log("selected option", selectedOption)
        setTopicSelected(selectedOption.value);
        
        //Navigate to the new url
        navigate(`/articles?topic=${selectedOption.value}`)

        // copy existing queries to avoid mutation
        const newParams = new URLSearchParams(searchParams);
        // set the topic query
        newParams.set('topic', selectedOption.value);
        setSearchParams(newParams);
        
        // Set the items to change article list without having to refresh


      };

    return (
        <div id="article-filter">
            <div id="topic-select-container">
                <h3>Topic</h3>
                <Select onChange={handleTopicChange} id="topic-dropdown" options={[{value: '', label: 'All'}, ...topicOptions]} />
            </div>
            <h3>Most Viewed</h3>
        </div>
    )
}

export default ArticleFilter