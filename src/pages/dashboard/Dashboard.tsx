import { useEffect, useState } from "react";
import { useMemberStoreN } from "../../global/indexedDB/store";
import { useSubscriptionStore } from "../members/components/subscription/store";

const Dashboard = () => {
  const { members, fetchMembers } = useMemberStoreN();
  const { fetchSubscriptions } = useSubscriptionStore();
  const [running, setRunning] = useState(0);
  const [expired, setExpired] = useState(0);
  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);
  useEffect(() => {
    const checkExpires = async () => {
      const updatedMembers = await Promise.all(
        members?.map(async (i) => {
          const res = await fetchSubscriptions(i?.id?.toString());
          const rev = res?.sort((a, b) => {
            return (
              new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
            );
          });
          i.membership = rev[0]?.state || "pending";
          return i;
        }) || []
      );
      return updatedMembers;
    };

    const handleFiltering = async () => {
      const updatedMembers = await checkExpires();
      const mem = updatedMembers?.reverse()?.filter((i) => !i?.isDeleted);

      setRunning(mem?.filter((i) => i.membership === "active").length);
      setExpired(mem?.filter((i) => i.membership !== "active").length);
    };

    handleFiltering();
  }, []);
  return (
    <div className="w-full h-full">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
        {/* card */}
        <div className="card w-[20em] h-[15em] bg-pink-300">
          <div
            className="text-center items-center font-extrabold
          font-sans text-[3rem] p-4
          "
          >
            Members
          </div>
          <span className="text-center font-bold text-2xl">
            {members?.length}
          </span>
        </div>

        {/* card */}
        <div className="card w-[20em] h-[15em] bg-pink-300">
          <div
            className="text-center items-center font-extrabold
          font-sans text-[3rem] p-4
          "
          >
            Running Membership
          </div>
          <span className="text-center font-bold">{running}</span>
        </div>

        {/* card */}

        <div className="card w-[20em] h-[15em] bg-pink-300">
          <div
            className="text-center items-center font-extrabold
          font-sans text-[3rem] p-4
          "
          >
            Expired Membership
          </div>
          <span className="text-center font-bold">{expired}</span>
        </div>

        {/* card */}

        <div className="card w-[20em] h-[15em] bg-pink-300">
          <div
            className="text-center items-center font-extrabold
          font-sans text-[3rem] p-4
          "
          >
            Active Members
          </div>
          <span className="text-center font-bold">
            {members?.filter((i) => !i.isDeleted)?.length}
          </span>
        </div>
        {/* card */}

        <div className="card w-[20em] h-[15em] bg-pink-300">
          <div
            className="text-center items-center font-extrabold
          font-sans text-[3rem] p-4
          "
          >
            Deactivated Members
          </div>
          <span className="text-center font-bold">
            {members?.filter((i) => i.isDeleted)?.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
