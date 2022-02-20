import React,{useState,useEffect} from 'react'
import {Button, Menu, Typography, Avatar} from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined, BulbOutlined, FundOutlined, MenuOutlined} from '@ant-design/icons/lib/icons'
import logo from '../images/cryptocurrency.png'

const Navbar = () => {
     const [activeMenu, setActiveMenu] = useState(true)
     const [screen, setScreen] = useState(null)

     useEffect(()=>{
          const handleResize = () => setScreen(window.innerWidth)

          window.addEventListener('resize', handleResize)
          handleResize()

          return () => window.removeEventListener('resize',handleResize)
     },[])

     useEffect(()=>{
          if(screen < 768){
               setActiveMenu(false)
          }

          else{
               setActiveMenu(true)
          }
     },[screen])

  return (
    <div className='nav-container'>
        <div className='logo-container'>
            <Avatar src={logo} size='large'/>
            <Typography.Title level={2} className='logo'>
                 <Link to='/'>Cryptoverse</Link>
            </Typography.Title>
            <Button className='menu-control-container' onClick={()=>setActiveMenu(!activeMenu)}>
                 <MenuOutlined/>
            </Button>
        </div>
        {activeMenu && (
               <Menu theme='dark'>
               <Menu.Item icon={<HomeOutlined/>} key='1'>
                    <Link to='/'>Home</Link>
               </Menu.Item>
               <Menu.Item icon={<FundOutlined/>} key='2'>
                    <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
               </Menu.Item>
               <Menu.Item icon={<BulbOutlined/>} key='3'>
                    <Link to='/news'>News</Link>
               </Menu.Item>
           </Menu>
        )}
        
    </div>
  )
}

export default Navbar