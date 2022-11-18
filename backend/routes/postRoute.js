const express = require('express')
const router = require('express').Router()
const { createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost , uploadPost , getAllPost , addComment, getComment } = require ('../controllers/PostController.js')
const {upload} = require('../helpers/multerHelper')

router.post('/create',createPost)
router.post('/upload',upload.single('image'),uploadPost)
router.put('/:id', updatePost)
router.get('/all', getAllPost)
router.get('/:id', getPost)
router.delete('/:id', deletePost)
router.put('/like/:id/:userId', likePost)
router.get('/:id/timeline', getTimelinePosts)
router.post('/comment',addComment)
router.get('/getcomment/:id',getComment)

module.exports = router; 