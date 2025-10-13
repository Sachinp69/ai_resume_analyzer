import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "constants/index";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Resume Analyzer" },
    { name: "description", content: "Create a better resume instantly with AI help" },
  ];
}

export default function Home() {
  
  const {auth} = usePuterStore();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!auth.isAuthenticated) navigate ('/auth?next=/');
  },[auth.isAuthenticated]) 

  return <main className=" bg-[url('/images/bg-main.svg')] bg-cover">
    <section className="navbar">
      <Navbar/>
    </section>
    
    <section className="main-section">
      <div className="page-heading">
        <h1>Track your applications and Resume Score</h1>
        <h2>Review your apllications and check AI-powered feedback</h2>
      </div>

      {resumes.length >0 && 
        <section className="resumes-section"> 
          {resumes.map((resume)=>(
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </section>
      } 
    </section>
  </main>;
}
