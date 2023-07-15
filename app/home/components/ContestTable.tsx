import Contest from "@/lib/types/contest";
import React from "react";
import ContestCard from "./ContestCard";
import ContestCardSkeleton from "./ContestCard/ContestCardSkeleton";

interface Props {
  label: string;
  contests: Contest[] | null;
  isLoading?: boolean;
}

function ContestTable(props: Props) {
  const { contests, isLoading, label } = props;

  return (
    <div className="px-5 md:px-12 lg:px-20 pt-5">
      <h3 className="text-xl">{label}</h3>
      {isLoading && (
        <>
          <ContestCardSkeleton />
          <ContestCardSkeleton />
          <ContestCardSkeleton />
        </>
      )}
      {contests?.map((contest) => (
        <ContestCard key={contest.id} contest={contest} />
      ))}
    </div>
  );
}

export default ContestTable;
