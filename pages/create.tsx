import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { baseURL } from "../constants/constants";

const create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [progress, setProgress] = useState("notStarted");

  const createButton = () => {
    axios
      .post(baseURL, {
        title: title,
        status: progress,
        detail: content,
      })
      .then((res) => {
        alert("タスクを追加しました。");
        setTitle("");
        setContent("");
        setProgress("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const changeProgress = (e) => {
    setProgress(e.target.value);
  };

  return (
    <div className="w-2/5 bg-teal-100 rounded-md  mx-auto p-9 my-20">
      <div className="flex flex-col  align-middle">
        <label htmlFor="title">タイトル</label>
        <input type="text" className="bg-blue-200 rounded-lg" id="title" value={title} onChange={changeTitle} />
        <label htmlFor="detail" className="mb-0">
          内容
        </label>
        <input type="text" className=" bg-blue-200 rounded-lg" id="detail" value={content} onChange={changeContent} />
        <select className="bg-blue-200 mt-6 w-32 mx-auto" value={progress} onChange={changeProgress}>
          <option value="notStarted">未着手</option>
          <option value="inProgress">作業中</option>
          <option value="done">完了</option>
        </select>
        <button className="bg-white h-10 w-14 border rounded-lg mx-auto mt-7" onClick={createButton}>
          追加
        </button>
        <Link href="/" className="bg-white h-10 w-14 border rounded-lg text-center pt-1">
          戻る
        </Link>
      </div>
    </div>
  );
};

export default create;
