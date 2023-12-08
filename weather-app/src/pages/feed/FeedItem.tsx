import React, { FC, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Post } from "../../types/feedType";
import { formatDate } from "../../utils/dateUtil";
import FeedHearts from "./FeedHearts";
import FeedSlide from "./FeedSlide";

interface FeedItemProps {
  post: Post;
}

const FeedItem: FC<FeedItemProps> = ({ post }) => {
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);

  const combinedTextLength = useMemo(
    () =>
      post.content.length +
      post.hashtagNames.reduce((acc, tag) => acc + tag.length + 1, 0),
    [post.content, post.hashtagNames]
  );

  const showMoreButton = combinedTextLength > 20 || post.content.includes("\n");
  const shouldDisplayFullText =
    combinedTextLength <= 20 && !post.content.includes("\n");
  const displayText = useMemo(
    () =>
      isExpanded || shouldDisplayFullText
        ? post.content
        : `${post.content.substring(0, 20)}...`,
    [isExpanded, shouldDisplayFullText, post.content]
  );

  if (!post) {
    return null;
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleUserClick = (nickName: string) => {
    navigate(`/feed/${nickName}`);
  };

  const handleTagClick = (tag: string) => {
    const formattedTag = tag.replace("#", "");
    navigate(`/feed/hashtags/${encodeURIComponent(formattedTag)}`);
  };

  return (
    <FeedContainer>
      <FeedContent>
        <FeedHeader>
          <img
            src={post.userImg}
            alt={`${post.nickName} 프로필 이미지`}
            onClick={() => handleUserClick(post.nickName)}
          />
          <div>
            <div>
              <span
                className="user"
                onClick={() => handleUserClick(post.nickName)}
              >
                {post.nickName}
              </span>
              <span className="date">{formatDate(post.date)}</span>
            </div>
            <div>
              <span>{post.location}</span>
              <span>{post.temperature}℃</span>
            </div>
          </div>
        </FeedHeader>

        {post.mediaUrls && post.mediaUrls.length > 0 && (
          <FeedSlide imgs={post.mediaUrls} />
        )}

        <FeedHearts
          liked={post.liked}
          heartCount={post.likedCount}
          postId={post.postId}
        />

        <FeedBottom>
          <div className="feed-text">
            <p>{displayText}</p>
            {(isExpanded || shouldDisplayFullText) &&
              post.hashtagNames.length > 0 && (
                <div className="feed-tags">
                  {post.hashtagNames.map((tag, index) => (
                    <Tag key={index} onClick={() => handleTagClick(tag)}>
                      #{tag}
                    </Tag>
                  ))}
                </div>
              )}
          </div>
          {showMoreButton && (
            <MoreButton onClick={toggleExpand}>
              {isExpanded ? "접기" : "더보기"}
            </MoreButton>
          )}
        </FeedBottom>
      </FeedContent>
    </FeedContainer>
  );
};

export default FeedItem;

const FeedContainer = styled.div`
  width: 500px;
  padding: 15px;
  margin: 20px auto 0;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  @media (max-width: 1024px) {
    width: 400px;
  }
  @media (max-width: 768px) {
    width: 80%;
    max-width: 350px;
  }
  @media (max-width: 430px) {
    width: calc(100% - 30px);
    padding: 20px 0;
    margin: 0 15px;
    border-radius: 0;
    box-shadow: none;
    border-bottom: 1px solid #525d9191;
    &:last-child {
      border-bottom: none;
    }
  }
`;

const FeedContent = styled.div`
  width: 100%;
  margin: auto;
`;

const FeedHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    object-fit: cover;
    margin-right: 10px;
    cursor: pointer;
  }
  div > div {
    span:last-child::before {
      content: "•";
      margin: 0 5px;
    }
    .user {
      cursor: pointer;
    }
    .date {
      color: #6d6d6d;
    }
  }
  div > div:last-child {
    margin-top: 4px;
    span {
      font-size: 0.875rem;
    }
  }
`;

const FeedBottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  word-break: break-all;
  .feed-text {
    display: inline-block;
    text-align: left;
    p {
      /* white-space: pre-wrap; */
      white-space: pre-line;
    }
  }
  .feed-tags {
    margin-top: 10px;
  }
`;

const Tag = styled.span`
  color: #5d6dbe;
  margin-right: 7px;
  cursor: pointer;
`;

const MoreButton = styled.span`
  margin-top: 10px;
  color: #7e7e7e;
  cursor: pointer;
`;
