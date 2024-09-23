import { Form, GetProp, message, UploadFile, UploadProps } from "antd";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import instance from "../../../configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
type FieldType = {
  contentReview?: string;
  rating_review?: number;
  image_review?: string[];
};
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const addReviewHook = () => {
  const queryClient = useQueryClient();
  const [currentReviewId, setCurrentReviewId] = useState<string | null>(null);
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const [openReviewOrderId, setOpenReviewOrderId] = useState<string | null>(
    null
  );
  const [openReview, setOpenReview] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [reviewedOrders, setReviewedOrders] = useState<{
    [orderId: string]: Set<string>;
  }>({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Thêm ảnh</div>
    </button>
  );
  const CLOUD_NAME = "dwya9mxip";
  const PRESET_NAME = "upImgProduct";
  const FOLDER_NAME = "PRODUCTS";
  const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const [rating, setRating] = useState<number>(0); // State để lưu giá trị rating
  const [initialContent, setInitialContent] = useState(""); // State để giữ giá trị ban đầu

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // Truy vấn dữ liệu đánh giá dựa trên currentReviewId
  const { data: dataReviewById } = useQuery({
    queryKey: ["Review_Key", currentReviewId],
    queryFn: async () => {
      const { data } = await instance.get(`/reviews/${currentReviewId}`);
      return data;
    },
    enabled: !!currentReviewId, // Chỉ thực hiện query khi currentReviewId có giá trị
  });
  console.log(dataReviewById);

  const { mutate: addReview } = useMutation({
    mutationFn: async (reviewData: {
      contentReview: string;
      productId: string;
      orderId: string;
      rating_review: number;
      image_review: string[];
    }) => {
      const { data } = await instance.post(`/review/${userId}`, {
        contentReview: reviewData.contentReview,
        productId: reviewData.productId,
        orderId: reviewData.orderId,
        rating_review: reviewData.rating_review,
        image_review: reviewData.image_review,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Order_Key"],
      });
      message.success("Gửi đánh giá thành công");
      setReviewedOrders((prev) => ({
        ...prev,
        [openReviewOrderId!]: new Set([
          ...Array.from(prev[openReviewOrderId!] || []),
          currentProductId!,
        ]),
      }));
    },
    onError: () => {
      message.error("Gửi đánh giá thất bại");
    },
  });
  // Cập nhật initialContent khi nhận được dataReviewById
  useEffect(() => {
    if (dataReviewById) {
      setInitialContent(dataReviewById.review?.contentReview || "");
      // setInitialImage(dataReviewById.review?.image_review || []);
      // setInitialRating(dataReviewById.review?.rating_review || 0);
    }
  }, [dataReviewById]);

  const handleOpenReview = (orderId, productId, reviewId) => {
    if (openReviewOrderId === orderId && openReview) {
      setOpenReview(false);
    } else {
      setOpenReview(true);
      setOpenReviewOrderId(orderId);
      setCurrentProductId(productId);
      setCurrentReviewId(reviewId); // Thiết lập currentReviewId trước khi useQuery chạy
    }
  };

  return {
    handlePreview,
    dataReviewById,
    addReview,
    handleOpenReview,
    CLOUD_NAME,
    PRESET_NAME,
    FOLDER_NAME,
    api,
    initialContent,
    rating,
    setRating,
    uploadButton,
    fileList,
    previewImage,
    previewOpen,
    reviewedOrders,
  };
};
export default addReviewHook;
