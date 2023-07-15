import Button from "@/app/components/Button";
import useUser from "@/app/hook/useUser";
import { joinContest } from "@/lib/api";
import Contest, { ContestType } from "@/lib/types/contest";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  contest: Contest | null;
  type: ContestType;
  reload: () => void;
}

function ContestCard(props: Props) {
  const { contest, type, reload } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const { refetchUser } = useUser();
  const router = useRouter();

  const join = async () => {
    if (!contest) return;
    try {
      setLoading(true);
      await joinContest(contest.id);
      reload();
      refetchUser();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="relative items-center w-full py-3 mx-auto">
        <div className="w-full p-4 mx-auto text-left align-bottom transition-all transform bg-gray-100 sm:align-middle sm:p-8 rounded-2xl">
          <div className="w-full mb-4">
            <span className="text-xl">{contest?.name ?? "Contest name"}</span>
          </div>
          <div className="w-full flex flex-row justify-between">
            <p className="text-base text-gray-500">
              {"User Count/ " + (contest?.user_count ?? "-")}
            </p>

            {type === "COMING" && !contest?.registered && (
              <Button
                label={loading ? "Loading..." : "/ Join"}
                onClick={join}
                disabled={loading}
              />
            )}
            {type === "COMING" && contest?.registered && <span>/ Joined!</span>}

            {type === "ON_GOING" && (
              <Button
                label={"/ Go To Contest"}
                onClick={() => {
                  router.push(`home/${contest?.id}`);
                }}
                disabled={loading}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContestCard;
