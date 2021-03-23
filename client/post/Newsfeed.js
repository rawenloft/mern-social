import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import auth from './../auth/auth-helper'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import NewPost from './NewPost'
import PostList from './PostList'


const useStyles = makeStyles(theme => ({
    card: {
      margin: 'auto',
      paddingTop: 0,
      paddingBottom: theme.spacing(3)
    },
    title: {
      padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
      color: theme.palette.openTitle,
      fontSize: '1em'
    },
    media: {
      minHeight: 330
    }
  }))

export default function Newsfeed() {

    const classes = useStyles()
    const [posts, setPosts] = useState([])
    const jwt = auth.isAuthenticated()

    useEffect(()=>{
        const abortController = new AbortController()
        const signal = abortController.signal


    },[])

    const addPost = (post) => {
        const updatedPosts = [...posts]
        updatedPosts.unshift(post)
        setPosts(updatedPosts)
    }
    const removePost = (post) => {
        const updatedPosts = [...posts]
        const index = updatedPosts.indexOf(post)
        updatedPosts.splice(index, 1)
        setPosts(updatedPosts)
    }
    return (
        <Card className={classes.card}>
            <Typography type="title" className={classes.title}>
                Newsfeed
            </Typography>
            <Divider />
            <NewPost addUpdate={addPost} />
            <Divider />
            <PostList removeUpdate={removePost} posts={posts} />
        </Card>
    )
}