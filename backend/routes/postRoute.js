const express = require('express')
const router = require('express').Router()
const { createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost } = require ('../controllers/PostController.js')
const {upload} = require('../helpers/multerHelper')

router.post('/create',upload.single('file'),createPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.put('/:id/like', likePost)
router.get('/:id/timeline', getTimelinePosts)

module.exports = router; 