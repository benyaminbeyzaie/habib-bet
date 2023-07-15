"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ContestTable from "./components/ContestTable";
import Contest from "@/lib/types/contest";
import {
  getArchivedContests,
  getComingContests,
  getOnGoingContests,
} from "@/lib/api";
import IncreaseCoin from "./components/IncreaseCoin";

function Home() {
  const [onGoingContests, setOnGoingContests] = useState<Contest[] | null>(
    null
  );
  const [comingContests, setComingContests] = useState<Contest[] | null>(null);
  const [archivedContests, setArchivedContests] = useState<Contest[] | null>(
    null
  );

  const getOnGoingData = async () => {
    try {
      const data = await getOnGoingContests();
      setOnGoingContests(data.data);
    } catch (error) {}
  };

  const getComingData = async () => {
    try {
      const data = await getComingContests();
      setComingContests(data.data);
    } catch (error) {}
  };

  const getArchivedData = async () => {
    try {
      const data = await getArchivedContests();
      setArchivedContests(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getOnGoingData();
    getComingData();
    getArchivedData();
  }, []);

  return (
    <div className="w-full">

      <IncreaseCoin />
      <ContestTable
        contestType="ON_GOING"
        isLoading={!onGoingContests}
        label="ON GOING/"
        contests={onGoingContests}
        reload={getOnGoingData}
      />
      <ContestTable
        contestType="COMING"
        isLoading={!comingContests}
        label="COMING/"
        contests={comingContests}
        reload={getComingData}
      />
      <ContestTable
        contestType="ARCHIVED"
        isLoading={!archivedContests}
        label="ARCHIVED/"
        contests={archivedContests}
        reload={getArchivedData}
      />
    </div>
  );
}

export default Home;
