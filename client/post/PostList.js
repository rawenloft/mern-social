import React from 'react'

export default function PostList(props) {
    return (
        <div style={{marginTop: '24px'}}>
            {props.posts.map((item, i) => {
                return <Post post={item} key={i} onRemove={props.removeUpdate} />
            })}
        </div>
    )
}