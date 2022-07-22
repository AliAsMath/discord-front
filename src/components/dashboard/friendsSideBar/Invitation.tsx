import React from "react";
import { useAppSelector } from "../../../redux/hook";
import InvitationItem from "./InvitationItem";
import { useAppDispatch } from "./../../../redux/hook";
import { friendsAction } from "../../../redux/slice/friend-slice";

const Invitation = () => {
  const { pendingFriendsInvitations } = useAppSelector(
    (state) => state.friends
  );

  const dispatch = useAppDispatch();

  const acceptFriendInvitation = (id: string) =>
    dispatch(
      friendsAction.acceptInvitationThunk({
        invitationId: id,
      })
    );

  const rejectFriendInvitation = (id: string) =>
    dispatch(
      friendsAction.rejectInvitationThunk({
        invitationId: id,
      })
    );

  return (
    <div className="flex flex-col flex-grow gap-2">
      <h4 className="self-center text-xl text-zinc-300">INVITATION</h4>
      {pendingFriendsInvitations.map((invitation) => (
        <InvitationItem
          key={invitation.id}
          {...invitation.senderUser}
          acceptFriendInvitation={() => acceptFriendInvitation(invitation.id)}
          rejectFriendInvitation={() => rejectFriendInvitation(invitation.id)}
        />
      ))}
    </div>
  );
};

export default Invitation;
