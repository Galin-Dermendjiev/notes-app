import { useState } from "react"
import Header from "./components/Header"
import Notes from "./components/Notes"
import SearchBar from "./components/SearchBar"

function App() {
  const isAuthenticated = true

  const [search, setSearch] = useState('')

  return (
    <>
      <Header />
      <SearchBar search={search} setSearch={setSearch}/>
      <Notes search={search}/>
    </>
  )
}

export default App
