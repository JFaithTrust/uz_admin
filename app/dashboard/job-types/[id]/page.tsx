"use client";
import { useJobTypesStore } from "@/lib/store/job-types-store";
import { useEffect } from "react";

const ViewId = ({ params }: { params: { id: string } }) => {
  const { job, fetchJobById } = useJobTypesStore();

  useEffect(() => {
    fetchJobById(params.id);
  }, [fetchJobById, params.id]);
  return (
    <div>
      <h1>{job?.title}</h1>
    </div>
  );
};

export default ViewId;
