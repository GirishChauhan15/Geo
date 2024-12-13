import { useEffect, useState } from 'react'
import {Map} from './components'
import {useUser} from './context'
import { Link } from 'react-router-dom'


function App() {
  const [selectedProfile, setSelectedProfile] = useState({})
  const [profiles, setProfiles] = useState([])
  const [searchData, setSearchData] = useState('')
const {users} = useUser()

const scrollToBottom = () =>{
  setTimeout(() => {
    window.scrollTo({
      top:document.body.scrollHeight,
      behavior:"smooth"
    })
  }, 500);
}

  const handleSummary = (profile) =>{
    setSelectedProfile({})
    setSelectedProfile(profile)
    scrollToBottom()
  }


  const handleSearch = (e) => {
    setSearchData(e.target.value)
  }

  const searchInfo = () => {
if(searchData) {

  const filteredData = users.filter(user=>{
    let allData = {...user,...user.address}
    return Object.values(allData)
    .join('')
    .toLowerCase()
    .includes(searchData.toLowerCase());
  })
  setProfiles(filteredData)
} else {
  setProfiles(users)
}

  }
 
  useEffect(()=>{
    searchInfo()
  },[searchData])
 
  return (
    <>
    <nav className="bg-gray-800 text-white p-4 shadow-[0_0_0_100vmax] shadow-gray-800 [clip-path:inset(0_-100vmax)]">
            <div className="container mx-auto flex justify-between flex-wrap items-center">
              <h1 className="text-xl font-bold">Geo 🌏</h1>
              <Link to={'/admin'} className="text-lg font-semibold hover:text-blue-400 transition">Admin</Link>
            </div>
          </nav>
    

    <div className="search my-6 flex justify-center">
      <input
        type="text"
        placeholder="Search profiles..."
        onChange={handleSearch}
        className="w-3/4 max-w-md p-2 bg-transparent border-b-2 outline-none text-white border-zinc-600 rounded-lg"
      />
    </div>

    <ul className="flex flex-wrap justify-center gap-6 p-6">
      {profiles?.length > 0 ? profiles?.map((profile, i) => (
        <li key={i} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="bg-gray-700 text-white flex flex-col items-center px-5 py-6 rounded-lg shadow-lg">
            <Link to={`/profile/${profile.id}`} className="hover:opacity-90 transition">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-16 h-16 object-cover rounded-full mb-4 transform transition-transform duration-300 hover:scale-110"
              />
            </Link>
            <h3 className="text-xl font-bold mb-2">{profile.name}</h3>
            <p className="text-sm text-gray-300 text-center">{profile.description}</p>
            <button
              className={`bg-blue-500 w-fit mt-4 px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-[.7rem] hover:bg-blue-600 transition ${isNaN(Number(profile.address.latitude)) || isNaN(Number(profile.address.longitude)) ? `bg-zinc-400 cursor-not-allowed hover:bg-zinc-500` : `bg-blue-500`} `}
              onClick={() => handleSummary(profile)}>
              Summary
            </button>
          </div>
        </li>
      )):<h1 className="text-red-500 sm:text-xl text-center">No users available.</h1>}
    </ul>

    {selectedProfile?.id && <Map profile={selectedProfile} />}
  </>
  )
}

export default App
