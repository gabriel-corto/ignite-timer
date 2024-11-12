import { Home } from "./pages/Home"
import { History } from "./pages/History"
import { DefaultLayout } from "./layouts/Default"

import { Routes, Route } from "react-router-dom"

export function Routers() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}