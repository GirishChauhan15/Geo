import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import {UserProvider} from './context'

function Layout() {
    const [users, setUsers] = useState([
        {
          id: 1,
          name: 'ipsum lorem',
          description: 'Software Engineer',
          image: 'https://avatar.iran.liara.run/public/43',
          address: {
            latitude: 28.7041,
            longitude: 77.1025,
            city: 'New Delhi',
            country: 'India',
          },
        },
        {
          id: 2,
          name: 'lorem',
          description: 'Data Scientist',
          image: 'https://avatar.iran.liara.run/public/66',
          address: {
            latitude: 19.076,
            longitude: 72.8777,
            city: 'Mumbai',
            country: 'India',
          },
        },
        {
          id: 3,
          name: 'Kana',
          description: 'UX Designer',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDv4IypsNlDqKx5_XwdakAhV19hDBHjkWkwpyFoV8ZitZNKiG2ukUdBfSIvcnmkd1ChDo&usqp=CAU',
          address: {
            latitude: 12.9716,
            longitude: 77.5946,
            city: 'Bangalore',
            country: 'India',
          },
        },
        {
          id: 4,
          name: 'another Lorem',
          description: 'Project Manager',
          image: 'https://avatar.iran.liara.run/public/1',
          address: {
            latitude: 13.0827,
            longitude: 80.2707,
            city: 'Chennai',
            country: 'India',
          },
        },
        {
          id: 5,
          name: 'Kim',
          description: 'DevOps Engineer',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG9pr9imIxIYtkasLO5K0XShV1ipYLS3WKYgyLtWk7jwKobonk0OrZFqe850gAsLa56Bw&usqp=CAU',
          address: {
            latitude: 48.8566,
            longitude: 2.3522,
            city: 'Paris',
            country: 'France',
          },
        },
      
    ])

    const addUser = (user) => {
        setUsers(prev=>[{id:Date.now(), ...user},...prev])
    }
    const updateUser = (id,user)=>{
    setUsers((prev) => prev.map((userInfo)=> (userInfo.id === id ? user : userInfo)))
    }

    const deleteUser = (id)=>{
        setUsers(prev=> prev.filter(info=>(info.id !== id)))
    }

  return (
    <UserProvider value={{users,addUser,updateUser,deleteUser}}>
    <Outlet />
    </UserProvider>
  )
}

export default Layout