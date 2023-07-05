import axios from "axios";
import Link from "next/link";
import { baseURL } from "../constants/constants";
import { useEffect, useState } from "react";

export async function getServerSideProps() {
  const res = await axios.get(baseURL);
  const posts = res.data;
  return { props: { posts } };
}

type Post = {
  id: number;
  title: string;
  status: any;
  detail?: string;
};

export default function Home({ posts }) {
  const [todos, setTodos] = useState<Post[]>([]);

  useEffect(() => {
    setTodos(posts);
  }, []);

  //deleteボタン
  const onClickDelete = async (index) => {
    function deletePost() {
      axios
        .delete(`${baseURL}/${index}`, {
          data: { userId: index },
        })
        .then((res) => {
          setTodos(res.data);
        });
    }
    deletePost();
  };

  //ステータス変更時
  const onChangeStatus = (e: any, targetPost: any) => {
    const changeStatus = () => {
      axios
        .put(`${baseURL}/${targetPost.id}`, {
          status: e.target.value,
        })
        .then((res) => {
          setTodos(res.data);
        });
    };
    changeStatus();
  };

  return (
    <>
      <div className="w-2/5 min-h-full bg-gray-200  mx-auto my-20 text-center pb-8">
        <Link href="/create" className="bg-blue-100 text-center w-60 h-14 my-10 text-2xl">
          <p>Create</p>
        </Link>
        <div>
          <div className="flex justify-center">
            <h2 className="text-2xl mr-5">Todoリスト</h2>
            <p>仮のセレクト</p>
          </div>
          <ul>
            {todos.map((post) => (
              <li className="flex justify-center my-2" key={post.id}>
                <p className="bg-blue-200 leading-10 py-1 px-4 mr-5 w-64">{post.title}</p>
                <div className="flex">
                  <Link href={`/edit/${post.id}`}>
                    <button className="bg-white h-10 w-14 border rounded-lg mr-5">編集</button>
                  </Link>
                  <button className="bg-white h-10 w-14 border rounded-lg mr-5" onClick={() => onClickDelete(post.id)}>
                    削除
                  </button>
                  <select className="bg-pink-200 w-18 h-6 mt-2 mx-auto" value={post.status} onChange={(e) => onChangeStatus(e, post)}>
                    <option value="notStarted">未着手</option>
                    <option value="inProgress">作業中</option>
                    <option value="done">完了</option>
                  </select>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
