import React from 'react'
import Layout from '../src/components/Layout'
import { Link } from 'react-router-dom'

const Index = () => {
  console.log('index')
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
          <button className="bg-purple text-white p-4 rounded-full min-w-80">
            Search the Database
          </button>
        </Link>
      </div>
    </Layout>
  )
}

export default Index
