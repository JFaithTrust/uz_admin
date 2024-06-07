"use client";

import { Badge } from "@/components/ui/badge";
import React, { useEffect } from "react";
import useWorkerStore from "@/lib/store/worker-store";

const ViewId = ({ params }: { params: { viewId: string } }) => {
  const { worker, getWorkerById, loading } = useWorkerStore();

  useEffect(() => {
    getWorkerById(params.viewId).then();
  }, [getWorkerById, params.viewId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={"w-full"}>

    </div>
  );
};

export default ViewId;