import cn from "classnames";
import Image from "next/image";
import { NotificationType } from "@/types";
import CustomPopup from "../CustomPopup";
import CustomInput from "@/components/common/Input/CustomInput";
import { useEffect, useState } from "react";
import CustomTextArea from "@/components/common/Input/CustomTextArea";
import Api from "@/services/api";
import { API_NOTIFICATION_ADD, notificationUrl } from "@/config";
import { AppState, useAppDispatch } from "@/redux/store";
import { shallowEqual, useSelector } from "react-redux";
import { setSelectedNotification } from "@/redux/reducers/modal.reducer";
import { deleteNotification } from "@/services/apis/notification";
import Loader from "@/components/common/Loader";

interface NotificationModalProps {
  show: boolean;
  onClose: () => void;
  setShow: (show: boolean) => void;
}

const defaultErrors = {
  title: "",
  link: "",
  description: "",
};

const NotificationModal: React.FC<NotificationModalProps> = ({
  show,
  onClose,
  setShow,
}) => {
  const dispatch = useAppDispatch();
  const { selectedNotification } = useSelector(
    (state: AppState) => ({
      selectedNotification: state.modal.selectedNotification,
    }),
    shallowEqual,
  );
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [notificationDetail, setNotificationDetail] =
    useState<NotificationType>({
      id: "",
      description: "",
      title: "",
      link: "",
      image: "",
    });
  const [logo, setLogo] = useState<string>();
  const [file, setFile] = useState<any>();
  const [errors, setErrors] = useState(defaultErrors);

  const reset = () => {
    setLogo("");
    setFile(undefined);
    setNotificationDetail({
      id: "",
      description: "",
      title: "",
      link: "",
      image: "",
    });
    dispatch(
      setSelectedNotification({
        id: "",
        description: "",
        image: "",
        link: "",
        title: "",
      }),
    );
  };

  const close = () => {
    reset();
    onClose();
  };

  const onSubmit = async () => {
    try {
      setIsUpdating(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", notificationDetail.title);
      formData.append("link", notificationDetail.link);
      formData.append("description", notificationDetail.description);

      await Api.uploadFile(
        API_NOTIFICATION_ADD,
        { ...notificationDetail },
        {},
        file,
        {},
      );
      close();
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteNotification(selectedNotification?.id || "");
      close();
    } catch (e) {
      console.error(e);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    setNotificationDetail(selectedNotification);
    if (selectedNotification?.image)
      setLogo(`${notificationUrl}/${selectedNotification.image}`);
  }, [selectedNotification]);

  return (
    <CustomPopup
      showModal={show}
      setShowModal={setShow}
      onClose={close}
      title={
        selectedNotification?.id ? "Notification Details" : "Add Notification"
      }
      classNames="max-w-[900px]"
    >
      <div className="flex min-h-[320px] w-full flex-row gap-8">
        <div className="flex flex-col items-center justify-evenly">
          <Image
            src={logo || ""}
            alt="logo"
            width={240}
            height={240}
            onError={(e) => {
              e.currentTarget.src = "/images/illustration/illustration-01.svg";
            }}
            className="h-auto min-w-[240px] max-w-[240px] overflow-hidden rounded-lg border border-solid border-strokedark object-contain"
          />
          <label
            htmlFor="avatar"
            className={cn(
              `flex w-full max-w-50 cursor-pointer items-center justify-center gap-2 rounded-lg border border-primary p-2 text-center text-primary shadow-sm hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`,
            )}
          >
            Add Logo
          </label>
          <input
            className="hidden"
            name="avatar"
            id="avatar"
            type="file"
            accept="image/*"
            onChange={(event) => {
              if (event.target.files?.[0]) {
                setLogo(URL.createObjectURL(event.target.files?.[0]));
                setFile(event.target.files[0]);
              }
            }}
          ></input>
        </div>
        <div className="flex w-full flex-col justify-between gap-4">
          <div className="flex items-center gap-1">
            <h6 className="w-full max-w-30">
              Title <span className="text-red">*</span>{" "}
            </h6>
            <div className="w-full">
              <CustomInput
                placeholder="Enter the title"
                error={errors.title}
                value={notificationDetail.title}
                onChange={(value) =>
                  setNotificationDetail({
                    ...notificationDetail,
                    title: value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <h6 className="w-full max-w-30">Link</h6>
            <div className="w-full">
              <CustomInput
                placeholder="Paste the link"
                error={errors.link}
                value={notificationDetail.link}
                onChange={(value) =>
                  setNotificationDetail({
                    ...notificationDetail,
                    link: value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex items-start gap-1">
            <h6 className="w-full max-w-30">Description</h6>
            <div className="w-full">
              <CustomTextArea
                placeholder="Enter the description"
                error={errors.description}
                value={notificationDetail.description}
                onChange={(value) =>
                  setNotificationDetail({
                    ...notificationDetail,
                    description: value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex items-start justify-end gap-4">
            {selectedNotification?.id ? (
              <button
                className={cn(
                  `flex w-full max-w-40 items-center justify-center gap-2 rounded-lg border border-red p-2 text-center text-red shadow-sm hover:bg-red hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`,
                )}
                onClick={onDelete}
              >
                {isDeleting && (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-red border-t-transparent"></div>
                )}
                Delete
              </button>
            ) : (
              <button
                className={cn(
                  `flex w-full max-w-40 items-center justify-center gap-2 rounded-lg border border-red p-2 text-center text-red shadow-sm hover:bg-red hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`,
                )}
                onClick={close}
              >
                Cancel
              </button>
            )}
            <button
              className={cn(
                `flex w-full max-w-40 items-center justify-center gap-2 rounded-lg border border-primary p-2 text-center text-primary shadow-sm hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`,
              )}
              onClick={onSubmit}
            >
              {isUpdating && (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-primary border-t-transparent"></div>
              )}
              {selectedNotification?.id ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </CustomPopup>
  );
};

export default NotificationModal;
