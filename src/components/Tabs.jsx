import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import "./Tabs.scss";
const url =
  "https://raw.githubusercontent.com/programmer-rahad/json-files/main/tabs.json";

function Tabs() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jobs = await response.json();
      setLoading(false);
      setJobs(jobs);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return <Loading />;
  }
  const { title, dates, duties, company } = jobs[index];

  return (
    <section className="jobs-center">
      <div className="btn-container">
        {jobs.map(({ id, company }, i) => (
          <button
            onClick={() => setIndex(i)}
            key={id}
            className={`job-btn ${i === index && "active-btn"}`}
          >
            {company}
          </button>
        ))}
      </div>
      <article className="job-info">
        <h3>{title}</h3>
        <div>
        <span className="job-company">{company}</span>
        <span className="job-date">{dates}</span>
        </div>
        <div>
          {duties.map((duty) => (
            <div className="job-desc">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 448 512"
                className="job-icon"
                height="1em"
                width="1em"
              >
                <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"></path>
              </svg>
              <p>{duty}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

export default Tabs;
