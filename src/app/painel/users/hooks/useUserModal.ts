import { useState } from "react";
import { useUsers } from "./getData";

import { useParams, useSearchParams } from "next/navigation";
import { useMediaList } from "./userMediaApi";


export const useUserModal = () => {
  const { data } = useUsers();
  const [openAlert, setAlert] = useState(false);
  const params: any = useParams();
  const { data: dataMedias } = useMediaList(params?.id);
  const [midiaData, setMidiaData] = useState<any>();
  const [openUser, setOpenUser] = useState<any>();
  const [open, setOpen] = useState(false);

  const [userData, setUserData] = useState<any>();

  console.log(data, "eeee");
  return {
    result: data ?? [],
    open,
    setOpen,
    userData,
    setUserData,
    
    openUser,
    setOpenUser,
    dataMedias,
    midiaData,
    setMidiaData,
    userId: params?.id,
    openAlert,
    setAlert,
     
  };
};
