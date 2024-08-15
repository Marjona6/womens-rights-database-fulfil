import React from 'react'
import Layout from './layout'
import { Link } from 'react-router-dom'
import './index.css'

const Index = ({ children }) => {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <img
          src="/images/project-logos/white-bg.png"
          alt="FULFIL logo"
          height={300}
          width={300}
        />
        <h1 className="text-2xl font-semibold mb-10">
          Welcome to the European Migrant Women's Rights Case Law Database
        </h1>
        <Link to="/search">
          <button className="bg-purple text-white p-4 rounded-full min-w-80 hover:bg-lightpurple">
            Search the Database
          </button>
        </Link>
      </div>
      <div className="mt-8">{children}</div>
    </Layout>
  )
}

export default Index
