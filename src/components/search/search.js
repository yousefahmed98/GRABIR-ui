import React from 'react'
import TextField from "@mui/material/TextField";
import "./search.css"
export default function Search() {
    return (
        <div className="main">
          <h1>React Search</h1>
          <div className="search">
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Search"
            />
          </div>
          {/* <List /> */} 
        </div>
      );
}
