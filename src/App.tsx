import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { SiteLayout } from "@/components/layout/site-layout"
import { HomePage } from "@/pages/home-page"
import { PortfolioPage } from "@/pages/portfolio-page"
import { ProposalPage } from "@/pages/proposal-page"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="proposal" element={<ProposalPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
