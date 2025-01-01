const UserHeader = () => {
  return (
    <div className="w-full flex font-semibold border-b gap-4">
      <div className="py-2 px-4 text-left w-1/12">ID</div>
      <div className="py-2 px-4 text-left w-4/12">User Name</div>
      <div className="py-2 px-4 text-left w-4/12">Email</div>
      <div className="py-2 px-4 pl-20 text-left w-1/12">Operations</div>
    </div>
  );
};

export default UserHeader;
