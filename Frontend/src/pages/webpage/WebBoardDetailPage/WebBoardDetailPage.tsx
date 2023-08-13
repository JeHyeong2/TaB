import { FC, useEffect, useState } from "react";
import { WebBoardDetailPageProps } from ".";
import {
  BOARD_KOR,
  CommentData,
  WebState,
  changeSelectedPostId,
  deleteOneBoard,
  saveBoardDetailData,
} from "@/store/slice/web-slice";
import { boardAPI } from "@/store/api/api";
import { Container, IconButton, Typography } from "@mui/material";
import { Button, Input, Stack } from "@mui/joy";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useDispatch, useSelector } from "react-redux";
import { prettyTime } from "../WebBoardPage";
import { useNavigate } from "react-router-dom";

export const WebBoardDetailPage: FC<WebBoardDetailPageProps> = ({ postId }) => {
  const data: WebState = useSelector((state: { web: WebState }) => {
    return state.web;
  });
  const [updateCommentId, setUpdateCommentId] = useState<null | number>(null)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [commentContent, setCommentContent] = useState("");

  const handleCommentContent = (e) => {
    setCommentContent(e.target.value);
  };



  const postComment = () => {
    if (!commentContent.trim()) {
      alert("내용을 입력해주세요");
      return;
    }
    boardAPI
      .post(
        `${postId}/comment/`,
        {
          content: commentContent,
        },
        {
          headers: {
            Authorization: `Bearer ${data.Token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        updateDetailData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateDetailData = () => {
    boardAPI
      .get(`${postId}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.code == "200") {
          dispatch(saveBoardDetailData(response.data.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(postId);
    updateDetailData();
  }, [postId]);

  const deleteBoard = () => {
    if (!data.Token) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }
    if (!confirm("게시글을 삭제하시겠습니까?")) {
      return;
    }
    boardAPI
      .delete(`${postId}`, {
        headers: { Authorization: `Bearer ${data.Token}` },
      })
      .then((response) => {
        if (response.data.code === 401) {
          alert("본인의 게시글만 삭제할 수 있습니다.");
          return;
        } else {
          console.log(response.data.code);
          alert("게시글이 삭제되었습니다");
          dispatch(deleteOneBoard(postId));
          dispatch(changeSelectedPostId(null));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteComment = (commentId) => {
    if (!data.Token) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }
    if (!confirm("댓글을 삭제하시겠습니까?")) {
      return;
    }
    boardAPI
      .delete(`${postId}/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${data.Token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        updateDetailData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateCommentId = (commentId) => {
    setUpdateCommentId(commentId);
  };

  const updateComment = (commentId, newContent) => {
    if (!newContent.trim()) {
      alert("내용을 입력해주세요");
      return;
    }
    boardAPI
      .put(
        `${postId}/comment/${commentId}`,
        {
          content: newContent,
        },
        {
          headers: {
            Authorization: `Bearer ${data.Token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setUpdateCommentId(null)
        updateDetailData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!data.boardDetailData) {
    return <div></div>;
  }

  interface CommentProps {
    el : CommentData;
    children : any;
  }
  
  const CommentItem: React.FC<CommentProps> = ({ el }) => {

    const [commentNewContent, setCommentNewContent] = useState("");

    const handleCommentNewContent = (val) => {
      setCommentNewContent(val);
    };
    return (
      <Container maxWidth="xl" sx={{ paddingTop: 8, height: 140 }}>
        <Stack direction={"row"}>
          <div>{el.userId}</div>
          <div>{prettyTime(el.createTime, true)}</div>
          {data.loginData.id == el.userId ? (
            <Stack direction={"row"}>
              {updateCommentId == el.id ? (
                <Stack direction={"row"}>
                  <Input
                    size="md"
                    variant="outlined"
                    color="neutral"
                    onChange={(e) =>
                      handleCommentNewContent(e.currentTarget.value)
                    }
                  ></Input>
                  <Button
                    size="sm"
                    variant="soft"
                    color="neutral"
                    onClick={() => updateComment(el.id, commentNewContent)}
                  >
                    수정
                  </Button>
                </Stack>
              ) : (
                <Button
                  size="sm"
                  variant="soft"
                  color="neutral"
                  onClick={() => {
                    handleUpdateCommentId(el.id);
                  }}
                >
                  수정
                </Button>
              )}
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={() => deleteComment(el.id)}
              >
                삭제
              </Button>
            </Stack>
          ) : (
            ""
          )}
        </Stack>
        <div>{el.content}</div>
      </Container>
    );
  };

  return (
    <div>
      <Container maxWidth="xl" sx={{ paddingTop: 8 }}>
        <div className="detail-header">
          <IconButton
            onClick={() => {
              dispatch(changeSelectedPostId(null));
            }}
          >
            <ArrowBackOutlinedIcon fontSize="large" />
          </IconButton>
          <div style={{ fontSize: "30px", fontWeight: "bold" }}>게시판</div>
        </div>
        <div className="detail">
          <Typography variant="h4" sx={{ margin: 5 }}>
            {data.boardDetailData?.title}
          </Typography>

          <div>{`작성자 : ${data.boardDetailData?.userId}`}</div>
          <div>{BOARD_KOR[data.boardDetailData.sort]}</div>

          <div>{`작성시간 : ${prettyTime(
            data.boardDetailData?.createTime
          )}`}</div>
          {/* html 코드 출력 */}
          <div
            dangerouslySetInnerHTML={{ __html: data.boardDetailData?.content }}
          ></div>
        </div>
      </Container>
      {data.loginData.id == data.boardDetailData.userId ? (
        <Container maxWidth="xl">
          <div className="bottom-buttons">
            <Button
              color="neutral"
              onClick={() => {
                navigate(
                  `update/${BOARD_KOR[data.boardDetailData.sort]}/${postId}`
                );
              }}
              variant="soft"
            >
              수정
            </Button>
            <Button color="neutral" onClick={deleteBoard} variant="soft">
              삭제
            </Button>
          </div>
        </Container>
      ) : (
        " "
      )}
      <Container maxWidth="xl" sx={{ paddingTop: 2 }}>
        <span style={{ fontSize: 16 }}>댓글</span>{" "}
        <span style={{ fontSize: 12 }}>
          {data.boardDetailData.commentResponseDtoList
            ? data.boardDetailData.commentResponseDtoList.length
            : 0}
          개
        </span>
        <hr />
        <div>
          {data.boardDetailData.commentResponseDtoList == null ||
          data.boardDetailData.commentResponseDtoList.length == 0 ? (
            <div>댓글이 아직 없습니다..</div>
          ) : (
            data.boardDetailData.commentResponseDtoList.map((el, index) => {
              return <CommentItem el={el} key={index}>
              </CommentItem>;
            })
          )}
        </div>
        <Stack direction={"row"} maxWidth="xl" sx={{ paddingTop: 8 }}>
          <Input
            size="md"
            placeholder="내용을 입력하세요.."
            variant="outlined"
            color="neutral"
            onChange={(e) => handleCommentContent(e)}
          ></Input>
          <Button variant="soft" color="neutral" onClick={postComment}>
            {" "}
            등록{" "}
          </Button>
        </Stack>
      </Container>
    </div>
  );
};
