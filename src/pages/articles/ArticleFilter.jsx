import Select from "react-select"
import { getTopics } from "../../components/utils/api"
import { useEffect, useState } from "react";

const ArticleFilter = ({setFilter}) => {
    const [topicOptions, setTopics] = useState([])
    const [topicSelected, setTopicSelected] = useState(null)
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
        console.log(`Option selected:`, selectedOption.value);
      };

    return (
        <div id="article-filter">
            <div id="topic-select-container">
                <h3>Topic</h3>
                <Select onChange={handleTopicChange}id="topic-dropdown" options={topicOptions} />
            </div>
            <h3>Most Viewed</h3>
        </div>
    )
}

export default ArticleFilter