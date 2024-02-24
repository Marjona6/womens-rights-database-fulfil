// import { Suspense } from 'react'
// import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
// // import routes from '~react-pages'

// function App() {
//   return (
//     <Suspense fallback={<p>Loading...</p>}>
//       {/* {useRoutes(routes)} */}
//     </Suspense>
//   )
// }

// ReactDOM.render(
//   <Router>
//     <App />
//   </Router>,
//   document.getElementById('root')
// )

import React from 'react'

const Project = () => {
  return (
    <div>
      About the project
      <img
        src="/images/project-logos/white-bg.png"
        alt="FULFIL logo"
        height={75}
        width={75}
      />
    </div>
  )
}

export default Project
