"use client";

import { Badge } from "@/components/ui/badge";
import React, { useEffect } from "react";
import useWorkerStore from "@/lib/store/worker-store";

const ViewId = ({ params }: { params: { viewId: string } }) => {
  const { worker, fetchWorkerById, loading } = useWorkerStore();

  useEffect(() => {
    fetchWorkerById(params.viewId).then();
  }, [fetchWorkerById, params.viewId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{worker?.title}</h1>
      <div className="flex flex-row items-center gap-x-10 mt-8">
        <div className="flex flex-col items-center">
          <h3>Ish turi</h3>
          <Badge variant="secondary">{worker?.title}</Badge>
        </div>
        <div className="flex flex-col items-center">
          <h3>Jinsi</h3>
          <Badge variant="secondary">{worker?.gender}</Badge>
        </div>
      </div>
    </div>
  );
};

export default ViewId;

