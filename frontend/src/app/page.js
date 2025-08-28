"use client"

import AboutPage from "./about/page"
import LandingPage from "./HomePage/page"
import RecipesPage from "./recipes/page"

export default function Home(){
  return(
    <div>
      <LandingPage/>
      <AboutPage id={"about"}/>
      <RecipesPage/>
    </div>
  )
}