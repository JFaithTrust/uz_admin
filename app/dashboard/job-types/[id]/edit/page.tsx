"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { JobsTypes, useJobTypesStore } from "@/lib/store/job-types-store";
import { useEffect, useState } from "react";
const EditItemPage = ({ params }: { params: { id: string } }) => {
  const { jobData, fetchUpdateJob } = useJobTypesStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const findJobTypeById = (id: string) => {
    return jobData.map((job) => {
      if (job.id === id) {
        console.log(id);
        setTitle(job.title);
        setDescription(job.description);
      }
    });
  };

  const handleUpdate = (title: string, description: string, id: string) => {
    fetchUpdateJob({ title, description, id });
  };

  useEffect(() => {
    findJobTypeById(params.id);
  }, []);

  return (
    <div className="w-full h-screen">
      <h1>Edit Page</h1>
      <div className="grid w-full max-w-xl items-center gap-3 mt-10">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <Label htmlFor="descrption" className="mt-5">
          Description
        </Label>
        <Textarea
          className="resize-none h-48"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <div className="flex flex-row gap-x-4">
          <Link href={`/dashboard/job-types`}>
            <Button
              onClick={() => handleUpdate(title, description, params.id)}
              className="px-8 !bg-blue-500 hover:!bg-blue-700"
            >
              Edit
            </Button>
          </Link>
          <Link href={`/dashboard/job-types`}>
            <Button className="px-8 !bg-slate-400 hover:!bg-slate-500">
              Cancel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditItemPage;
