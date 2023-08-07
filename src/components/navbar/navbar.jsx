import { Stack, Box } from "@mui/system"
import { Link } from "react-router-dom"
import { colors } from '../../constants/colors'
import { SearchBar } from '../../components'

const Navbar = () => {
  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} p={2} sx={{position:'sticky', top: 0, zIndex: 999, background: colors.primary}}>
      <Link to={'/'}>
        <img src={require('../../constants/logo.jpg')} alt="logo" height={40} />
      </Link>
      <SearchBar />
      <Box />
    </Stack>
  )
}

export default Navbar