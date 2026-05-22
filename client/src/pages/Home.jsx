import React from "react";
import { useSelector } from "react-redux";
import HomeCard from "../components/HomeCard.jsx";

const Home = () => {
  const { posts } = useSelector((state) => state.posts);
  console.log(posts);
  return (
    <div className="flex items-center m-5 flex-wrap ">
      {posts?.map((post) => (
        <HomeCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Home;
