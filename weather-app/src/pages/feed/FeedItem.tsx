import React, { FC, useState } from "react";
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

  if (!post) {
    return null;
  }

  const combinedTextLength =
    post.text.length + post.tags.reduce((acc, tag) => acc + tag.length + 1, 0);
  const showMoreButton = combinedTextLength > 20 || post.text.includes("\n");
  const displayText =
    isExpanded || !showMoreButton
      ? post.text
      : `${post.text.substring(0, 20)}...`;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleUserClick = (userId: string) => {
    navigate(`/feed/${userId}`);
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
            alt={`${post.userId} 프로필 이미지`}
            onClick={() => handleUserClick(post.userId)}
          />
          <div>
            <div>
              <span
                className="user"
                onClick={() => handleUserClick(post.userId)}
              >
                {post.userId}
              </span>
              <span className="date">{formatDate(post.date)}</span>
            </div>
            <div>
              <span>{post.location}</span>
              <span>{post.temperature}℃</span>
            </div>
          </div>
        </FeedHeader>

        <FeedSlide imgs={post.imgs} />

        <FeedHearts heartCount={post.heartCount} postId={post.postId} />

        <FeedBottom>
          <div className="feed-text">
            <p>{displayText}</p>
            {isExpanded && (
              <div className="feed-tags">
                {post.tags.map((tag, index) => (
                  <Tag key={index} onClick={() => handleTagClick(tag)}>
                    {tag}
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
      font-size: 14px;
    }
  }
`;

const FeedBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  .feed-text {
    display: inline-block;
    text-align: left;
  }
  .feed-tags {
    margin-top: 10px;
  }
`;

const Tag = styled.a`
  color: #5d6dbe;
  margin-right: 7px;
  cursor: pointer;
`;

const MoreButton = styled.span`
  margin-top: 10px;
  color: #7e7e7e;
  cursor: pointer;
`;
