import Avatar from "./../../abstract/Avatar";

interface MessageProps {
  _id: string;
  content: string;
  sameAuthor: boolean;
  author: {
    username: string;
  };
  date: string;
  sameDay: boolean;
}

const Message: React.FC<MessageProps> = ({
  _id,
  author,
  content,
  date,
  sameAuthor,
  sameDay,
}) => {
  if (sameAuthor && sameDay) return <div className="ml-16">{content}</div>;

  return (
    <>
      {!sameDay && (
        <div className="flex items-center justify-center w-full h-0 mt-5 border-b border-zinc-300">
          <h4 className="p-2 bg-zinc-600">{date}</h4>
        </div>
      )}
      <div className="flex mt-5">
        <div className="w-16">
          <Avatar username={author.username} />
        </div>
        <div>
          <div className="font-Oswald">
            <span className="capitalize">{author.username}</span>
            <span className="ml-1 text-zinc-500">{date}</span>
          </div>
          <div className="">{content}</div>
        </div>
      </div>
    </>
  );
};

export default Message;
