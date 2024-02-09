import { useEffect, useState } from "react"
import "./TopicList.css"
import { getTopics } from "../../utils/utils"
import { Alert, Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material"


export const TopicList = ({topic, setTopic}) => {
const [topicsList, setTopicsList] = useState([])
const [err,setErr] = useState(null)


useEffect(()=>{
getTopics().then((data)=>{
    setTopicsList(data)
}).catch((err)=>{
    setErr(err.message)
  })
})
const handleChange = (event) => {
    setTopic(event.target.value);
  };

if (err) {
    return (<Box sx={{ minWidth: 120 }}>
        <Alert>{err}</Alert>
    </Box>
    )
}



return (
    <div>
        <Box sx={{ minWidth: 120 }}>
       <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Topic</InputLabel>
        <Select
          labelId="topic-select"
          id="topic-select"
          value={topic}
          label="Age"
          onChange={handleChange}
        >{topicsList.map(({slug}) => (
            <MenuItem
              key={slug}
              value={slug}
            >
              {slug}
            </MenuItem>))}
          
        </Select>
      </FormControl>
      </Box>
    </div>
)
}