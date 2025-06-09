import request from 'utils/request'

export const getArticles = (params) => {
    return request({
        url: '/mp/articles',
        method: 'GET',
        params
    })
}

export const getArticleDetail = (id) => {
    return request({
        url: '/mp/articles/'+id,
        method: 'GET'
    })
}

export const delArticle = (params) => {
    return request({
        url: 'mp/articles/' + params.id,
        method: 'DELETE',
    })
}

export const addArticle = (params) =>{
    return request({
        url: 'mp/articles',
        method: 'POST',
        data: params
    });
}

export const addDraft = (params) =>{
    const query = new URLSearchParams();
    query.append("draft", true);
    return request({
        url: 'mp/articles',
        method: 'POST',
        params: query,
        data: params
    });
}

export const updArticle = (params) =>{
    return request({
        url: 'mp/articles/' + params.id,
        method: 'PUT',
        data: params
    })
}

export const updArticleDraft = (params) =>{
    const query = new URLSearchParams();
    query.append("draft", true);
    return request({
        url: 'mp/articles/' + params.id,
        method: 'PUT',
        data: params
    })
}