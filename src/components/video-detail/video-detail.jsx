import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { ApiServise } from '../../service/api.servise'
import { Avatar, Box, Button, Chip, Container, Stack, Typography } from "@mui/material"
import ReactPlayer from "react-player"
import { CheckCircle, FavoriteOutlined, MarkChatRead, Tag, Visibility } from "@mui/icons-material"
import { Loader, Videos } from '../'

const VideoDetail = () => {
  const {id} = useParams()
  const [videoDetail, setVideoDetail] = useState('')
  const [relatedVideo, setRelatedVideo] = useState('')

  useEffect(() => {
    const getData = async () => {
      const data = await ApiServise.fetching(`videos?part=snippet,statistics&id=${id}`)
      setVideoDetail(data.items[0])
      const relatedData = await ApiServise.fetching(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      setRelatedVideo(relatedData.items)
    }
    getData()
  }, [id])
  if (!videoDetail.snippet) return <Loader />

  const {
    snippet: {tags, title, channelId, channelTitle, description, thumbnails},
    statistics: {viewCount, likeCount, commentCount}
  } = videoDetail

  return (
    <Box minHeight={'90vh'} mb={10}>
      <Container sx={{display: 'flex', flexDirection: {xs: 'column', md: 'row'}}}>
        <Box width={{xs: '100%', md: '70%'}}>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className='react-player' controls />
          {tags?.map((item, idx) => (
            <Chip label={item} key={idx} sx={{marginTop: '10px', cursor: 'pointer', ml: '10px'}} deleteIcon={<Tag />} onDelete={() => {}} variant='outlined' />
          ))}
          <Typography variant="h5" fontWeight='bold' p={2}>
            {title}
          </Typography>
          <Typography variant="subtitle2" p={2} sx={{opacity: '.7'}}>
            {description.slice(0, 700)} ...more
          </Typography>
          <Stack direction='row' gap='20px' alignItems='center' py={1} px={2}>
            <Stack sx={{opacity: 0.7}} direction='row' alignItems='center' gap='3px'>
              <Visibility />
              {parseInt(viewCount).toLocaleString()} views
            </Stack>
            <Stack sx={{opacity: 0.7}} direction='row' alignItems='center' gap='3px'>
              <FavoriteOutlined />
              {parseInt(likeCount).toLocaleString()} likes
            </Stack>
            <Stack sx={{opacity: 0.7}} direction='row' alignItems='center' gap='3px'>
              <MarkChatRead />
              {parseInt(commentCount).toLocaleString()} comment
            </Stack>
          </Stack>
          <Stack direction='row' py={1} px={2}>
          <Link to={`/channel/${channelId}`}>
            <Stack direction='row' alignItems='center' gap='5px' marginTop='5px'>
              <Avatar src={thumbnails?.default?.url} alt={channelTitle} />
              <Typography variant='subtitle2' color='gray'>
                {channelTitle}
                <CheckCircle sx={{fontSize: '12px', color: 'gray', ml: '5px'}} />
              </Typography>
            </Stack>
          </Link>
          </Stack>
        </Box>
        <Box width={{xs: '100%', md: '30%'}} sx={{paddingTop: {xs: '40px', md: '0px'}, paddingLeft: {xs: '0px', md: '20px', justifyContent: 'center', alignItems: 'center', overflow: 'scroll', maxHeight: '150vh'}}}>
          <Videos videos={relatedVideo} />
        </Box>
      </Container>
    </Box>
  )
}

export default VideoDetail