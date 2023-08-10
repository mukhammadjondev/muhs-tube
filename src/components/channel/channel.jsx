import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ApiServise } from '../../service/api.servise'
import { Box, Container } from '@mui/material'
import { ChannelCard, Loader, Videos } from '../'

const Channel = () => {
  const [channelDetail, setChannelDetail] = useState()
  const [channelVideos, setChannelVideos] = useState([])
  const {id} = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        const dataChannelDetail = await ApiServise.fetching(`channels?part=snippet&id=${id}`)
        setChannelDetail(dataChannelDetail.items[0])
        const dataVideo = await ApiServise.fetching(`search?channelId=${id}&part=snippet%2Cid&order=date`)
        setChannelVideos(dataVideo.items)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [id])

  if(!channelVideos.length) return <Loader />

  return (
    <Box minHeight={'95vh'}>
      <Box>
        <Box width={'100%'} height={'200px'} zIndex={10} sx={{backgroundImage: `url(${channelDetail?.brandingSettings?.image?.bannerExternalUrl})`, backgroundPosition: 'center', backgroundSize: 'cover', objectFit: 'cover', backgroundRepeat: 'no-repeat'}} />
        <ChannelCard video={channelDetail} marginTop={'-100px'} />
      </Box>
      <Container>
        <Videos videos={channelVideos} />
      </Container>
    </Box>
  )
}

export default Channel