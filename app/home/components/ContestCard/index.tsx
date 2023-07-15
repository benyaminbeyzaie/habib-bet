import Contest from "@/lib/types/contest";
import React from "react";

interface Props {
  contest: Contest | null;
}

function ContestCard(props: Props) {
  const { contest } = props;
  return (
    <section>
      <div className="relative items-center w-full py-3 mx-auto">
        <div className="w-full p-4 mx-auto text-left align-bottom transition-all transform bg-gray-100 sm:align-middle sm:p-8 rounded-2xl">
          <div className="w-full mb-4">
            <span className="text-xl">{contest?.name ?? "Contest name"}</span>
          </div>
          <div className="w-full">
            <p className="text-base text-gray-500">
              {"User Count/ " + (contest?.user_count ?? "-")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContestCard;
