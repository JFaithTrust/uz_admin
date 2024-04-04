import { formatNumber } from "@/lib/utils";

const JobCard = ({
  word,
  jobTitle,
}: {
  word: string;
  jobTitle: string | number;
}) => {
  return (
    <div>
      <h2>{word}</h2>
      <p className="text-lg font-semibold">
        {typeof jobTitle === "number" ? formatNumber(jobTitle) : jobTitle}
      </p>
    </div>
  );
};

export default JobCard;
