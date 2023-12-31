import { Box, Container, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { colors } from "../../constants/colors"
import { ApiServise } from "../../service/api.servise"
import { Videos } from "../"

const Search = () => {
  const [videos, setVideos] = useState([])
  const {id} = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ApiServise.fetching(`search?part=snippet&q=${id}`)
        setVideos(data.items)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [id])

  return (
    <Box p={2} sx={{height: '90vh'}}>
      <Container>
        <Typography variant={'h4'} fontWeight={'bold'} mb={2}>
          Search results for <span style={{color: colors.secondary}}>{id}</span> videos
        </Typography>
        <Videos videos={videos} />
      </Container>
    </Box>
  )
}

export default Search