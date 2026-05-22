import React from "react";
import { MdOutlineDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { deletePostsAction, updatePostsAction } from "../redux/actions/post";
import { toast } from "react-toastify";

const HomeCard = ({ post }) => {
  const dispatch = useDispatch();

  const deletePost = (id) => {
    dispatch(deletePostsAction(id));
    toast.success("Silme işlemi başarılı", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const updatePost = (id) => {
    dispatch({ type: "MODAL", payload: { isOpen: true, updateId: id } });
  };

  return (
    <div className=" relative w-100 border p-4 rounded-md bg-gray-50 ml-3 ">
      <h2 className="text-xl font-bold mb-2">{post?.title}</h2>
      <p className="text-gray-600">{post?.description}</p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-gray-500 capitalize ">{post?.user}</span>
        <span className="text-xs text-gray-500 ">
          {new Date(post?.date).toLocaleDateString()}
        </span>
      </div>
      <div className="absolute top-0 right-0 flex items-center space-x-2 mt-4 ">
        <MdOutlineDelete
          onClick={() => deletePost(post._id)}
          size={22}
          className="bg-red-500 rounded-full text-white cursor-pointer "
        />
        <RxUpdate
          onClick={() => updatePost(post._id)}
          size={22}
          className="bg-red-500 rounded-full text-white cursor-pointer "
        />
      </div>
    </div>
  );
};

export default HomeCard;
