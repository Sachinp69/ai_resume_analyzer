import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumizer" },
    { name: "description", content: "Analyze and create a better resume instantly with AI help"},
  ];
}

export default function Home() {  
  const {auth, kv} = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setloadingResumes] = useState(false);


  useEffect(()=>{
    if(!auth.isAuthenticated) navigate ('/auth?next=/');
  },[auth.isAuthenticated]) 

  useEffect(()=>{
    const loadResumes = async()=>{
      setloadingResumes(true);

      const resumes = (await kv.list('resume-*',true)) as KVItem[];
       
      const parsedResumes = resumes?.map((resume)=>(
        JSON.parse(resume.value) as Resume
      ));
      console.log('parsedResumes', parsedResumes);
      setResumes(parsedResumes || []);
      setloadingResumes(false);
    }
    loadResumes();
  },[])

  return <main className=" bg-[url('/images/bg-main.svg')] bg-cover">
    <section className="navbar">
      <Navbar/>
    </section>
    
    <section className="main-section">
      <div className="page-heading">
        <h1>Track your applications and Resume Score</h1>

        {!loadingResumes && resumes.length === 0 ? (
          <h2>No resumes found, upload your first resume to get a review/feedback</h2>
        ):(
          <h2>Review your apllications and check AI-powered feedback</h2>
        )}
      </div>

      {loadingResumes && (
        <div className="flex flex-col items-center justify-center" >
          <img src='/images/resume-scan-2.gif w-[20px]' />
        </div>
      )}

      {!loadingResumes && resumes.length > 0 && 
        (<section className="resumes-section"> 
          {resumes.map((resume)=>(
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </section>)
      }
      {!loadingResumes && resumes.length === 0 &&(
        <div className="flex flex-col items-center justify-center mt-10 gap-4" >
          <Link to='/upload' className="primary-button w-fit text-semibold">
            Upload your first resume
          </Link>
        </div>
      )}
    </section>
  </main>;
}
