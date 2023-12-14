import axios from "axios"

const api = axios.create({
    baseURL: "https://northcoders-news-r0zu.onrender.com/api"
})

export const convertDateTime = (dateTime) => {
    let date = new Date(dateTime)

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

// Allow user to press enter on the collapsible and cancel buttons
export const enableEnterPress = () => {
    const keypressButtons = [].slice.call(document.getElementsByClassName('enter-press'))
    // Apply event listener when buttons have loaded
    if (keypressButtons.length !== 0) {
        keypressButtons.forEach((button) => {
            button.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                  event.preventDefault();
                  button.click();
                }
              });
        })
    }
}

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
    console.log(urlSuffix)
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

export const postCommentByArticleId = (body, article_id, username) => {
    return api.post(`/articles/${article_id}/comments`, {body: body, username: username})
}

export const deleteCommentByCommentId = (comment_id) => {
    return api.delete(`/comments/${comment_id}`)
}

export const getTopics = () => {
    return api.get(`/topics`)
    .then((res) => {
        return res.data
    })
}