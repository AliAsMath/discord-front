import { useAppSelector } from "../../../redux/hook";
import Header from "./Header";
import Message from "./Message";
import { convertDateToHumanReadable } from "./../../../util/date";

const Messages = () => {
  const { messages, chosenChatDetails } = useAppSelector((state) => state.chat);
  return (
    <div className="flex-grow p-2">
      {chosenChatDetails?.username && (
        <Header username={chosenChatDetails?.username} />
      )}

      {messages.map((message, index) => {
        const sameAuthor =
          index > 0 && message.author._id === messages[index - 1].author._id;

        const sameDay =
          index > 0 &&
          convertDateToHumanReadable(message.date, "dd/mm/yy") ===
            convertDateToHumanReadable(messages[index - 1].date, "dd/mm/yy");
        return (
          <Message
            key={message._id}
            {...message}
            sameAuthor={sameAuthor}
            sameDay={sameDay}
            date={convertDateToHumanReadable(message.date, "dd/mm/yy")}
          />
        );
      })}
    </div>
  );
};

export default Messages;
