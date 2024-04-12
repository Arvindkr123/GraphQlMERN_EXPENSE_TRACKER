import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import Cards from "../components/Cards.jsx";
import TransactionForm from "../components/TransactionForm.jsx";

import { MdLogout } from "react-icons/md";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations/user.mutation.js";
import toast from "react-hot-toast";
import { GET_TRANSACTIONS_STATISTICS } from "../graphql/query/transaction.query.js";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
  const [logout, { loading: logoutLoading }] = useMutation(LOGOUT, {
    refetchQueries: ["getAuthenticatedUser"],
  });

  const {
    loading: transactionStatisticsLoading,
    data: transactionStatisticsData,
  } = useQuery(GET_TRANSACTIONS_STATISTICS);
  const [chartData, setCharData] = useState({
    labels: [],
    datasets: [
      {
        label: "$",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 130,
      },
    ],
  });

  useEffect(() => {
    if (transactionStatisticsData?.categoryStatistics) {
      const categories = transactionStatisticsData?.categoryStatistics.map(
        (stat) => stat.category
      );
      const totalAmounts = transactionStatisticsData?.categoryStatistics.map(
        (stat) => stat.totalAmount
      );
      console.log("category and totalAmount", categories, totalAmounts);

      const backgroundColors = [];
      const borderColors = [];

      categories.forEach((c) => {
        if (c === "expense") {
          backgroundColors.push("rgba(255, 99, 132)");
          borderColors.push("rgba(255, 99, 132)");
        } else if (c === "investment") {
          backgroundColors.push("rgba(54,162, 235)");
          borderColors.push("rgba(54,162, 235)");
        } else if (c === "saving") {
          backgroundColors.push("rgba(75,192,192)");
          borderColors.push("rgba(75,192,192)");
        }
      });

      // console.log(
      //   "backgroundColors and borderColors",
      //   backgroundColors,
      //   borderColors
      // );
      setCharData((prev) => ({
        labels: categories,
        datasets: [
          {
            ...prev.datasets[0],
            data: totalAmounts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
          },
        ],
      }));
    }
  }, [transactionStatisticsData]);

  console.log("category statistics", transactionStatisticsData);

  const handleLogout = async () => {
    try {
      // console.log("Logging out...");
      await logout();
      toast.success("logged out successfully");
    } catch (error) {
      toast.error(error.message);
      console.log("error", error);
    }
  };

  const loading = false;

  return (
    <>
      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
        <div className="flex items-center">
          <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
            Spend wisely, track wisely
          </p>
          <img
            src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
            className="w-11 h-11 rounded-full border cursor-pointer"
            alt="Avatar"
          />
          {!logoutLoading && (
            <MdLogout
              className="mx-2 w-5 h-5 cursor-pointer"
              onClick={handleLogout}
            />
          )}
          {/* loading spinner */}
          {logoutLoading && (
            <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
          )}
        </div>
        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]  ">
            <Doughnut data={chartData} />
          </div>

          <TransactionForm />
        </div>
        <Cards />
      </div>
    </>
  );
};
export default HomePage;
