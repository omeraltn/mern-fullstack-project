import React from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { createPostsAction, updatePostsAction } from "../redux/actions/post";
import { toast } from "react-toastify";
const Modal = () => {
  const [postData, setPostData] = React.useState({
    user: "",
    title: "",
    description: "",
  });

  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.modal);

  const onChangeFunc = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const postCreate = () => {
    if (modal?.updateId) {
      dispatch(updatePostsAction(modal?.updateId, postData));
    } else {
      dispatch(createPostsAction(postData));
    }

    dispatch({ type: "MODAL", payload: false });
    const text = modal?.updateId
      ? "Güncelleme işlemi başarılı"
      : "Paylaşma işlemi başarılı";
    toast.success(text, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="w-full h-screen bg-black/50  fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white w-1/2 p-5 rounded-md  ">
        <div
          onClick={() => dispatch({ type: "MODAL", payload: false })}
          className="flex items-center justify-between cursor-pointer "
        >
          <h1 className="font-bold text-2xl whitespace-nowrap text-center">
            {modal?.updateId ? "Post Güncelle" : "Paylaş"}
          </h1>
          <IoMdClose size={25} />
        </div>

        <div className="my-4 flex flex-col space-y-3 ">
          <input
            className="input-style"
            type="text"
            name="user"
            placeholder="User"
            value={postData.user}
            onChange={onChangeFunc}
          />
          <input
            className="input-style"
            type="text"
            name="title"
            placeholder="Title"
            value={postData.title}
            onChange={onChangeFunc}
          />
          <input
            className="input-style"
            type="text"
            name="description"
            placeholder="Description"
            value={postData.description}
            onChange={onChangeFunc}
          />
        </div>
        <div
          onClick={postCreate}
          className="w-full p-2 text-center bg-indigo-600 text-white
        cursor-pointer rounded-md mt-2 hover:bg-indigo-800"
        >
          {modal?.updateId ? "Post Güncelle" : "Post Paylaş"}
        </div>
      </div>
    </div>
  );
};

export default Modal;
