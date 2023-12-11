import { useEffect, useState } from "react"
import { getArticles } from "../../components/utils/api"

const ArtcilesList = () => {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getArticles({})
        .then((res) => {
            setArticles(res.articles)
            setIsLoading(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    if (isLoading) {
        return (
            <h1 className="loading">Loading...</h1>
        )
    }
    
    return (
        <div id="article-container">
            <h2>ARTICLES LIST</h2>
        </div>
    )
}

export default ArtcilesList