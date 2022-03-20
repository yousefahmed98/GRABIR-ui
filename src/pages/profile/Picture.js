import React from 'react'
import {
    Card,
    Stack
} from 'react-bootstrap'
import "./profile.css"


export default function Picture({data}) {
  return (
      <>
        <Stack direction="horizontal" gap={3}>
        <div className=" border pic">
            <Card style={{ width: '18rem' }}>
                <Card.Img  variant="top" src={localStorage.getItem("ProfilePic")}/>
            </Card>
        </div>
        </Stack>
        </>
  )
}
