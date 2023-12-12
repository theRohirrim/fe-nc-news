import axios from "axios"

const api = axios.create({
    baseURL: "https://northcoders-news-r0zu.onrender.com/api"
})

export const getArticles = (queries) => {
    let urlSuffix = "/articles"

    if (queries) {
        if (Object.values(queries)) {
            urlSuffix += '?'  

            let queryStrings = []
            for (const [key,value] of Object.entries(queries)) {
                if (value) queryStrings.push(`${key}=${value}`)
            }

            urlSuffix += queryStrings.join('&')
        }
    }

    return api.get(urlSuffix)
    .then((res) => {
        return res.data
    })
}

export const updateVotes = (itemType, id, voteChange) => {
    if (itemType === 'article') return api.patch(`/articles/${id}`, {inc_votes: voteChange})

    if (itemType === 'comment') return api.patch(`/comments/${id}`, {inc_votes: voteChange})
}

export const getArticleById = (article_id) => {
    return api.get(`/articles/${article_id}`)
    .then((res) => {
        return res.data
    })
}

export const getCommentsByArticleId = (article_id) => {
    return api.get(`/articles/${article_id}/comments`)
    .then((res) => {
        return res.data
    })
}