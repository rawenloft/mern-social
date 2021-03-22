import React, { useState, useEffect } from 'react'
import auth from './../auth/auth-helper'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import List from'@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {read} from './api-user'
import Edit from '@material-ui/icons/Edit'
import Person from '@material-ui/icons/Person'
import { Link, Redirect } from 'react-router-dom'
import DeleteUser from './DeleteUser'
import FollowProfileButton from './FollowProfileButton'
import FollowGrid from './FollowGrid'

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5),
        padding: theme.spacing(3)
    }),
    title:{
        marginTop: `${theme.spacing(2)}px ${theme.spacing(1)}px 0`,
        color: theme.palette.protectedTitle,
        fontSize: '1em'
    },
    bigAvatar: {
        width: 60,
        height: 60,
        margin: 10
    }
}))

export default function Profile({ match }) {
    
    const classes = useStyles()
    const [values, setValues] = useState({
        user:{following:[], followers:[]},
        redirectToSignin: false,
        following: false
    })
    

    const jwt = auth.isAuthenticated()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        read({
            userId: match.params.userId
        }, {t: jwt.token}, signal).then((data) => {
            if (data && data.error) {
                console.log(data)
                setValues({ ...values, redirectToSignin: true})
            } else {
                let following = checkFollow(data)
                setValues({...values, user: data, following: following})
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [match.params.userId])

    const checkFollow = (user) => {
        const match = user.followers.some((follower) => {
            return follower._id == jwt.user._id
        })
        return match
    }

    const clickFollowButton = (callApi) => {
        callApi({
            userId: jwt.user._id
        }, {t: jwt.token}, values.user._id).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error})
            } else {
                setValues({ ...values, user: data, following: !values.following})
            }
        })
    }

    const photoUrl = values.user._id 
            ? `/api/users/photo/${values.user._id}?${new Date().getTime()}`
            : '/api/users/defaultphoto'

    if (values.redirectToSignin) {
        return <Redirect to="/signin/" />
    }
    return (
        <Paper className={classes.root} elevation={4} >
            <Typography variant="h6" className={classes.title} >
                Profile
            </Typography>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src={photoUrl} className={classes.bigAvatar}>
                            <Person />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={values.user.name}
                                secondary={values.user.email}
                    />
                    { auth.isAuthenticated().user &&
                            auth.isAuthenticated().user._id == values.user._id 
                        ? (<ListItemSecondaryAction>
                                <Link to={"/user/edit/" + values.user._id}>
                                    <IconButton aria-label="Edit" color="primary">
                                        <Edit />
                                    </IconButton>
                                </Link>
                                <DeleteUser userId={values.user._id} />
                            </ListItemSecondaryAction>)
                        : (<FollowProfileButton following={values.following} onButtonClick={clickFollowButton} />)
                    }
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={values.user.about} secondary={"Joined: " + (new Date(values.user.created)).toDateString()} />
                </ListItem>
            </List>
            <FollowGrid people={values.user.following} />
        </Paper>
    )
}