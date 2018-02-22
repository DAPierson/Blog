import * as baseService from './base';

function all() {
    return baseService.get('/api/blogs');
}

function one(id) {
    return baseService.get(`/api/blogs/${id}`);
}

function insert(data) {
    return baseService.post('/api/blogs', data);
}

function update(id, data) {
    return baseService.put(`/api/blogs/${id}`, data);
}

function destroy(id) {
    return baseService.destroy(`/api/blogs/${id}`);
}

function insertTags(data) {
    return baseService.post('/api/blogs/addtag', data);
}

function allTags() {
    return baseService.get('/api/tags');
}
function allUsers() {
    return baseService.get('/api/blogs/users');
}

function one(id) {
    return baseService.get(`/api/blogs/${id}`);
}
function tagBlog(id) {
    return baseService.get(`/api/blogs/tag/${id}`);
}
function destroyTag(id){
    return baseService.destroy(`/api/blogs/deltag/${id}`)
}

function blogTag(id){
    return baseService.get(`/api/blogs/blog/${id}`)
}

export { all, one, insert, update, destroy, insertTags, allTags, allUsers, tagBlog, destroyTag, blogTag};