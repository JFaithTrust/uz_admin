"use client";
import { useJobTypesStore } from "@/lib/store/job-types-store";
import React, { useEffect } from "react";
import { JobTable } from "./job-table/page";

const JobTypes = () => {
  const { jobData, fetchJobs } = useJobTypesStore();

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <JobTable data={jobData} />
    </div>
  );
};

export default JobTypes;
