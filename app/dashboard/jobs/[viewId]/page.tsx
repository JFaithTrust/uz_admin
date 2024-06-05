"use client";

import { Badge } from "@/components/ui/badge";
import { useJobStore } from "@/lib/store/jobs-store";
import { format } from "date-fns";
import React, { useEffect } from "react";
import JobCard from "./job-card";

const ViewId = ({ params }: { params: { viewId: string } }) => {
  const { job, fetchJobsId } = useJobStore();

  useEffect(() => {
    fetchJobsId(params.viewId);
  }, [fetchJobsId, params.viewId]);

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
          {/*<JobCard*/}
          {/*  word="E'lon berilgan sana:"*/}
          {/*  jobTitle={*/}
          {/*    format(*/}
          {/*      job.createDate ? job.createDate : new Date(),*/}
          {/*      "dd.MM.yyyy"*/}
          {/*    ) + "-yil"*/}
          {/*  }*/}
          {/*/>*/}
          <JobCard word="Ish kuni:" jobTitle={job.workingSchedule} />
        </div>
      </div>
    </div>
  );
};

export default ViewId;