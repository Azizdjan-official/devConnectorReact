import { Button, Container, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { FaUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../Store/Slices/post";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa6";

const Posts = () => {
  const { data, isLoading } = useFetch("/posts");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  // console.log(user);
  

  useEffect(() => {
    dispatch(setPosts(data));
  }, [data, dispatch]);

  const posts = useSelector((store) => store.post.posts);
  // console.log(posts);

  async function handleCreatePost(e) {
    e.preventDefault();

    if (!text) return toast("Text is required", { type: "error" });

    setLoading(true);
    try {
      const { data } = await axios.post("/posts", { text });
      dispatch(setPosts([data, ...posts]));
    } catch (error) {
      console.log(error);
      const errors = error?.response?.data?.errors;
      if (errors?.length > 0) {
        errors.forEach((err) => {
          toast(err.msg, { type: "error" });
        });
      }
    } finally {
      setLoading(false);
      setText("");
    }
  }
  async function handleLike() {
    const { data } = await axios.put(`/posts/like/${post._id}`);
    dispatch(likePost({ postId: post._id, likes: data }));
  }

  async function handleUnlike() {
    const { data } = await axios.put(`/posts/unlike/${post._id}`);
    dispatch(unlikePost({ postId: post._id, likes: data }));
  }

  return (
    <section>
      <Container>
        <h1 className="text-info display-4 fw-bold">Sign In</h1>
        <p className="fs-4">
          <FaUser /> Welcome to the community
        </p>
        <p className="bg-info text-light py-2 px-4">Say Something...</p>
        <Form className="d-grid gap-3 my-3" onSubmit={handleCreatePost}>
          <Form.Control
            value={text}
            onChange={(e) => setText(e.target.value)}
            as="textarea"
            placeholder="Create a Post"
          />
          <Button type="submit" variant="dark" disabled={loading}>
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </Form>
        {isLoading ? (
          <Spinner />
        ) : (
          posts && (
            <div className="container d-flex flex-column gap-3">
              <ul>
                {posts.map((post) => {
                  return (
                    <>
                    <li className="list-unstyled d-flex align-items-center justify-content-between">
                      <div className="d-flex flex-column justify-content-center align-items-center gap-2 text-center w-25">
                        <img id="avatarImage" src={post.avatar} />
                        <h1 className="fs-5 tex-center">{post.name}</h1>
                      </div>
                      <div  className="d-flex flex-column gap-3  w-75">
                        <h1 className="fs-4">{post.text}</h1>
                        <h2 className="fs-6">Posted on {new Date(post.date).toLocaleDateString()} </h2>
                        <div className="d-flex gap-1">
                            <Button
                                variant="success"
                                disabled={post.likes.find((like) => like.user === user?._id)}
                                onClick={handleLike}
                              >
                                <FaThumbsUp /> {post.likes.length}
                            </Button>
                            <Button
                                variant="warning"
                                disabled={!post.likes.find((like) => like.user === user?._id)}
                                onClick={handleUnlike}
                                className="mx-3"
                              >
                                <FaThumbsDown />
                            </Button>
                          <Button as={Link} to={`/posts/${post._id}`} variant="info">
                          Discussion
                          </Button>
                        </div>
                      </div>
                    </li>
                    
                    </>
                    
                  );
                })}
              </ul>
            </div>
          )
        )}
      </Container>
    </section>
  );
};

export default Posts;
