"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import withAuth from "@/hooks/withAuth";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getLatestNotifications } from "@/services/apis/notification";
import CustomTable from "@/components/common/Table/CustomTable";
import { NOTIFICATION_LIST_COLUMN } from "@/config/columns";
import { AppState, useAppDispatch } from "@/redux/store";
import { SortType } from "@/types";
import moment from "moment";
import { shallowEqual, useSelector } from "react-redux";
import NotificationDetailModal from "@/components/DetailModals/NotificationDetailModal";
import { useCallback, useState } from "react";

const Notification: React.FC = () => {
  const [isNotification, setIsNotification] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>();
  const [updated, setUpdated] = useState(0);

  const getNotification = useCallback(
    async (
      page: number,
      page_size: number,
      sortData: { column: string; order: SortType },
    ) => {
      const response = await getLatestNotifications({
        page: page,
        page_size,
        sort_column: sortData.column,
        sort_order: sortData.order,
      });
      const _notifications =
        response?.notifications?.map((item: any) => ({
          id: item?.id || "",
          created_at:
            moment(new Date(item.created_at)).format("yyyy-MM-DD HH:mm:ss") ||
            "",
          updated_at:
            moment(new Date(item.updated_at)).format("yyyy-MM-DD HH:mm:ss") ||
            "",
          title: item?.title || "",
          description: item?.description || "",
          link: item?.link || "",
          image: item?.image || "",
        })) || [];
      return {
        data: _notifications,
        page: response.page,
        pageSize: response.page_size,
        totalCount: response.total_count,
        total_page: response.total_page,
      };
    },
    [updated],
  );
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="System Notification" />

        <div className=" grid grid-cols-12 gap-4  md:gap-6 2xl:gap-7.5">
          <div className="col-span-12 xl:col-span-12">
            <div className="rounded-lg border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
              <div className="flex justify-between">
                <h4 className="mb-2 text-xl font-semibold capitalize text-black dark:text-white">
                  System Notification
                </h4>
                <button
                  className={`flex w-full max-w-40 items-center justify-center gap-2 rounded-lg border border-primary p-2 text-center text-primary shadow-sm hover:bg-primary hover:text-white  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  onClick={() => {
                    setSelectedNotification({
                      id: "",
                      description: "",
                      title: "",
                      link: "",
                      image: "",
                    });
                    setIsNotification(true);
                  }}
                >
                  Add Notification
                </button>
              </div>

              <div className="mt-2 flow-root">
                <CustomTable
                  tableClassName="table-fixed"
                  getData={getNotification}
                  columns={NOTIFICATION_LIST_COLUMN}
                  defaultSort={{
                    column: "created_at",
                    order: SortType.DESC,
                  }}
                  onRow={(row) => {
                    setSelectedNotification(row);
                    setIsNotification(true);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>

      <NotificationDetailModal
        show={isNotification}
        onClose={() => setIsNotification(false)}
        setShow={setIsNotification}
        detailedData={selectedNotification}
        onChanged={setUpdated}
      />
    </>
  );
};

const NotificationAuth = withAuth(Notification);

export default NotificationAuth;
