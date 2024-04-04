"use client";

import { Badge } from "@/components/ui/badge";
import { useJobStore } from "@/lib/store/jobs-store";
import { formatNumber } from "@/lib/utils";
import React, { useEffect } from "react";
import JobCard from "./job-card";

const ViewId = ({ params }: { params: { viewId: string } }) => {
  const { job, fetchJobsId } = useJobStore();

  useEffect(() => {
    fetchJobsId(params.viewId);
  }, [fetchJobsId, params.viewId]);

  function getTime() {
    const date = new Date(job.createDate);
    let day: string | number = date.getDay();
    day = day < 10 ? "0" + day : day;
    let month: string | number = date.getMonth();
    month = month < 10 ? "0" + month : month;
    let year: string | number = date.getFullYear();

    if (year < 10) {
      year = "0" + year;
    }

    return day + "." + month + "." + year + "-yil";
  }

  return (
    <div>
      <h1 className="text-xl font-bold">{job.title}</h1>
      <div className="flex flex-row items-center gap-x-10 mt-8">
        <div className="flex flex-col items-center">
          <h3>Ish turi</h3>
          <Badge variant="secondary">{job.title}</Badge>
        </div>
        <div className="flex flex-col items-center">
          <h3>Jinsi</h3>
          <Badge variant="secondary">{job.gender}</Badge>
        </div>
      </div>
      <div className="mt-12">
        <div className="grid grid-cols-3 gap-y-16 gap-x-5">
          <JobCard word="Maosh" jobTitle={job.salary} />
          <JobCard word="Ish vaqti" jobTitle={job.workingTime} />
          <JobCard word="Sharoitlar" jobTitle={job.benefit} />
          <JobCard
            word="Yosh uchun talab"
            jobTitle={job.minAge + " dan " + job.maxAge + " gacha"}
          />
          <JobCard word="Tajriba" jobTitle={job.requirement} />
          <JobCard word="E'lon berilgan sana:" jobTitle={job.title} />
          <JobCard word="Telefon raqami:" jobTitle={job.phoneNumber} />
          <JobCard word="E'lon berilgan sana:" jobTitle={getTime()} />
          <JobCard word="Ish kuni:" jobTitle={job.workingSchedule} />
        </div>
      </div>
    </div>
  );
};

export default ViewId;
