"use client";

import ModalUser from "./components/ModalUser";
import { UserTable } from "./components/UserTable";
import { useUserModal } from "./hooks/useUserModal";

export default function Users() {
  const {
    result,

    setUserData,
    userData,

    openUser,
    setOpenUser,
  } = useUserModal();
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-2 p-6">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <UserTable
            handleCreate={() => setOpenUser(true)}
            data={result ?? []}
            handleEdit={(data) => {
              setUserData(data);
              setOpenUser(true);
            }}
            // handleDelete={() => console.log("")}
          />
          <ModalUser
            handleChange={() => setOpenUser(false)}
            open={openUser}
            user={userData}
          />
        </div>
      </div>
    </div>
  );
}
