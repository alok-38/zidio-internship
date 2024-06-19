"use client";
import {
  createFilterCategoryAction,
  fetchJobApplicationsForCandidate,
  fetchJobApplicationsForRecruiter,
  fetchJobsForCandidateAction,
  fetchJobsForRecruiterAction,
  fetchProfileAction,
} from "@/actions";
import JobListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";
import { useEffect, useState } from "react";

async function JobsPage({ searchParams }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const [jobList, setJobList] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const currentUserData = await currentUser();
        setUser(currentUserData);

        const profileData = await fetchProfileAction(currentUserData?.id);
        setProfileInfo(profileData);

        let jobs;
        let applications;

        if (profileData?.role === "candidate") {
          jobs = await fetchJobsForCandidateAction(searchParams);
          applications = await fetchJobApplicationsForCandidate(
            currentUserData?.id
          );
        } else {
          jobs = await fetchJobsForRecruiterAction(currentUserData?.id);
          applications = await fetchJobApplicationsForRecruiter(
            currentUserData?.id
          );
        }

        setJobList(jobs);
        setJobApplications(applications);

        const categories = await createFilterCategoryAction();
        setFilterCategories(categories);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [searchParams]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <JobListing
      user={user}
      profileInfo={profileInfo}
      jobList={jobList}
      jobApplications={jobApplications}
      filterCategories={filterCategories}
    />
  );
}

export default JobsPage;
