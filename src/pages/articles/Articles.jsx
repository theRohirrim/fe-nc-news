import { useState } from "react"
import ArticleFilter from "./ArticleFilter"
import ArtcileList from "./ArticleList"

const Articles = () => {
    const [currentFilter, setFilter] = useState('')
    return (
        <main>
            <ArticleFilter setFilter={setFilter}/>
            <ArtcileList currentFilter={currentFilter}/>
        </main>
    )
}

export default Articles