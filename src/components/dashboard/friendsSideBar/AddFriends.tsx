import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { validateMail } from "./../../../util/validation";
import { useAppDispatch } from "./../../../redux/hook";
import { friendsAction } from "./../../../redux/slice/friend-slice";

const AddFriends = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [mail, setMail] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsValid(validateMail(mail));
  }, [mail]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.currentTarget.value);
  };

  const closeHandler = () => {
    setIsOpen(false);
    setMail("");
  };

  const sendInvitationHandler = () => {
    dispatch(friendsAction.sendInvitationThunk({ mail, closeHandler }));
  };

  return (
    <>
      <Button
        className="w-full !normal-case !mb-4"
        variant="contained"
        color="success"
        onClick={setIsOpen.bind(this, true)}
      >
        Add Friend
      </Button>
      <Dialog open={isOpen} onClose={closeHandler}>
        <DialogTitle>Invite a Friend</DialogTitle>
        <DialogContent>
          <DialogContentText className="!text-">
            Enter E-mail address of friend which you want to invite
          </DialogContentText>
          <TextField
            margin="dense"
            id="mail"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={mail}
            onChange={changeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button
            className="w-full !mx-3 !mb-3"
            onClick={sendInvitationHandler}
            disabled={!isValid}
            variant="contained"
          >
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddFriends;
