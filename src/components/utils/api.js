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