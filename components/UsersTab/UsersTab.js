import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userHeaderRenderer } from "../../utility/header-renderers";
import UsersList from "./UsersList/UsersList";
import { Pagination } from "antd";
import { changePaginationAction } from "../../store/actions/user-crud-actions";

const PAGE_SIZE = 4;

const UsersTab = () => {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.UserReducer.role);
  const loadingUsers = useSelector(
    (state) => state.UserCrudReducer.loadingUsers
  );
  const users = useSelector((state) => state.UserCrudReducer.users);
  const totalCount = useSelector((state) => state.UserCrudReducer.totalCount);
  const currentPage = useSelector((state) => state.UserCrudReducer.currentPage);

  useEffect(() => {
    dispatch(changePaginationAction(currentPage, PAGE_SIZE));
  }, []);

  return (
    <div className="p-3">
      {userHeaderRenderer(userRole).header}
      {userHeaderRenderer(userRole).description}
      <UsersList users={users} loading={loadingUsers} />
      <div className="d-flex justify-content-end mt-5">
        <Pagination
          current={currentPage}
          total={totalCount}
          pageSize={4}
          onChange={(page, pageSize) => {
            dispatch(changePaginationAction(page, PAGE_SIZE));
          }}
        />
      </div>
    </div>
  );
};

export default UsersTab;
