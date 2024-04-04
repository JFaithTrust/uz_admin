"use client";

import { Badge } from "@/components/ui/badge";
import { useJobStore } from "@/lib/store/jobs-store";
import React, { useEffect } from "react";

const ViewId = ({ params }: { params: { viewId: string } }) => {
  const { job, fetchJobsId } = useJobStore();

  useEffect(() => {
    fetchJobsId(params.viewId);
  }, [fetchJobsId, params.viewId]);

  console.log(job);

  return (
    <div>
      <h1 className="text-2xl font-bold">{job.title}</h1>
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
    </div>
  );
};

export default ViewId;
