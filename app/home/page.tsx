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
import Button from "../components/Button";
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
      <Navbar />
      <IncreaseCoin />
      <ContestTable
        isLoading={!onGoingContests}
        label="ONGOGING/"
        contests={onGoingContests}
      />
      <ContestTable
        isLoading={!comingContests}
        label="COMMING/"
        contests={comingContests}
      />
      <ContestTable
        isLoading={!archivedContests}
        label="ARCHIVED/"
        contests={archivedContests}
      />
    </div>
  );
}

export default Home;
