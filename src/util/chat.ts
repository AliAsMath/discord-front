import { chatAction } from "../redux/slice/chat-slice";
import { store } from "./../redux/store";

export const updateChatIfCoversationIsActive = (data: {
  participants: [string, string];
  messages: any[];
}) => {
  const { chosenChatDetails } = store.getState().chat;

  if (chosenChatDetails && data.participants.includes(chosenChatDetails?.id))
    store.dispatch(chatAction.setMessages(data.messages));
};
