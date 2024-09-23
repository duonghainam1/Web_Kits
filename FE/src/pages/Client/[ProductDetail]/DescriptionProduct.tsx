import { useState, useEffect } from "react";
import { IProduct } from "../../../common/interfaces/Product";
import { Query_Products } from "../../../common/hooks/Products/Products";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import {
  Button,
  Form,
  FormProps,
  GetProp,
  Image,
  Input,
  Modal,
  Popconfirm,
  Rate,
  Spin,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import { AiFillStar, AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

type FieldType = {
  contentReview?: string;
  image_review?: string[]; // Thêm image_review vào FieldType
  rating_review?: number; // Thêm image_review vào FieldType
};

const DescriptionProduct = ({ product, id }: IProduct & { id?: string }) => {
  const formattedDescription = product?.description_product.replace(
    /\n/g,
    "<br />"
  );
  const CLOUD_NAME = "dwya9mxip";
  const PRESET_NAME = "upImgProduct";
  const FOLDER_NAME = "PRODUCTS";
  const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const [toggleDes, setTogleDes] = useState<boolean>(true);
  const [editReviewId, setEditReviewId] = useState<string | null>(null);
  const [form] = Form.useForm();
  const { id: productId } = useParams();
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const queryClient = useQueryClient();
  const [rating, setRating] = useState({});
  // const [fileList, setFileList] = useState<UploadFile[]>([]);
  // Trạng thái để lưu giá trị rating của các review

  const [fileList, setFileList] = useState(() => {
    // Chuyển đổi hình ảnh từ `image_review` thành dạng fileList để hiển thị ảnh trước đó
    const initialImages = form.getFieldValue("image_review") || [];
    return initialImages.map((url, index) => ({
      uid: index.toString(),
      name: `image-${index}`,
      url,
    }));
  });

  const { data, isLoading, isError } = Query_Products(productId);
  console.log(data);

  console.log(data.review);

  const getBase64 = (file: FieldType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const [previewImage, setPreviewImage] = useState(""); // Hình ảnh xem trước
  const [previewOpen, setPreviewOpen] = useState(false); // Trạng thái hiển thị modal xem trước

  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // const handleUploadChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  //   form.setFieldsValue({
  //     image_review: newFileList.map((file) => file.url || ""),
  //   });
  // };

  useEffect(() => {
    const initialFileList = (form.getFieldValue("image_review") || []).map(
      (url, index) => ({
        uid: index.toString(),
        url,
        name: `image-${index}`, // Có thể thêm tên tùy ý
        status: "done", // Đánh dấu rằng ảnh đã được tải lên trước đó
      })
    );

    setFileList(initialFileList); // Khởi tạo fileList với ảnh từ review trước đó

    if (editReviewId && data?.product?.reviews) {
      const review = data.product.reviews.find(
        (r: any) => r._id === editReviewId
      );
      if (review) {
        form.setFieldsValue({
          contentReview: review.contentReview,
          image_review: review.image_review || [], // Cập nhật hình ảnh
          rating_review: review.rating_review || "",
        });
      }
    }
  }, [editReviewId, data, form]);

  const { mutate: deleteReview } = useMutation({
    mutationFn: async ({ reviewId, productId, orderId }) => {
      if (!userId) {
        throw new Error("User not authenticated");
      }
      const { data } = await instance.delete(
        `/review/${userId}/${productId}/${reviewId}/${orderId}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Product_Key"] });
      message.success("Xóa thành công");
    },
    onError: () => {
      message.error("Xóa thất bại");
    },
  });

  const handleRatingChange = (reviewId, rate) => {
    setRating((prevRating) => ({
      ...prevRating,
      [reviewId]: rate, // Lưu giá trị rating tương ứng với mỗi review
    }));
  };

  const { mutate: updateReview } = useMutation({
    mutationFn: async ({
      reviewId,
      productId,
      orderId,
      contentReview,
      image_review,
      rating_review,
    }: {
      reviewId: string;
      productId: string;
      orderId: string;
      contentReview: string;
      image_review?: string[];
      rating_review: number;
    }) => {
      const { data } = await instance.put(
        `/review/${userId}/${productId}/${reviewId}/${orderId}`,
        { contentReview, image_review, rating_review }, // Cập nhật nội dung và hình ảnh
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Product_Key"] });
      message.success("Cập nhật thành công");
      setEditReviewId(null);
    },
    onError: () => {
      message.error("Cập nhật thất bại");
    },
  });

  const handleEditClick = (
    reviewId: string,
    productId: string,
    orderId: string,
    contentReview: string,
    image_review?: string[],
    rating_review: number
  ) => {
    setEditReviewId(reviewId);
    form.setFieldsValue({ contentReview, image_review, rating_review });
  };

  // const handlePreview = async (file) => {
  //   let src = file.url || file.thumbUrl;

  //   if (!src) {
  //     src = await new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //       reader.onerror = (error) => reject(error);
  //     });
  //   }

  //   const imgWindow = window.open(src);
  //   imgWindow.document.write(`<img src="${src}" style="width: 100%;" />`);
  // };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Thêm ảnh</div>
    </button>
  );

  const customUploadRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);

    try {
      const response = await fetch(api, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      file.url = result.secure_url; // Cập nhật URL từ server
      onSuccess?.(result); // Gọi callback khi upload thành công

      form.setFieldsValue({
        image_review: [
          ...(form.getFieldValue("image_review") || []),
          result.secure_url,
        ],
      });

      message.success("Tải lên thành công!");
    } catch (error) {
      console.error("Upload error:", error);
      onError?.(error); // Gọi callback khi upload thất bại
      message.error("Tải lên thất bại!");
    }
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (editReviewId) {
      // Tìm sản phẩm từ data
      const productId = data?.products?._id || "";

      // Tìm review chính từ data.review
      const reviewContainer = data?.review?.find((r: any) =>
        r.reviews.some((subReview: any) => subReview._id === editReviewId)
      );

      // Nếu tìm thấy reviewContainer, tìm review con và lấy orderId
      const review = reviewContainer?.reviews.find(
        (subReview: any) => subReview._id === editReviewId
      );
      const orderId = review?.orderId || "";

      // Gọi hàm updateReview với các tham số đã chuẩn bị
      updateReview({
        reviewId: editReviewId,
        contentReview: values.contentReview || "",
        productId,
        orderId,
        image_review: values.image_review || [], // Thêm image_review vào payload
        rating_review: values.rating_review || 0,
      });
    }
  };

  const isOwnReview = (reviewUserId: string) => {
    return userId === reviewUserId;
  };

  const handleCancel = () => {
    setEditReviewId(null);
    form.resetFields(); // Reset form fields to their initial values
  };

  return (
    <>
      <div className="flex flex-col border-t lg:py-10 lg:mt-10 mb:py-[34px] mb:mt-8">
        <ul className="flex items-center gap-x-8 border-b lg:pb-6 mb:pb-5 *:whitespace-nowrap *:px-6 *:lg:py-2.5 *:mb:py-[7px] *:rounded *:border *:place-items-center *:lg:text-base *:mb:text-xs">
          <button
            onClick={() => setTogleDes(true)}
            className={`btn_show_description grid hover:border-[#05422C] hover:bg-[#F2F6F4] ${
              toggleDes ? "border-[#05422C] text-[#05422C] bg-[#F2F6F4]" : ""
            }`}
          >
            Mô tả
          </button>
          <button
            onClick={() => setTogleDes(false)}
            className={`btn_show_description grid hover:border-[#05422C] hover:bg-[#F2F6F4] ${
              toggleDes ? "" : "border-[#05422C] text-[#05422C] bg-[#F2F6F4]"
            }`}
          >
            Đánh giá
          </button>
        </ul>
        <div className={toggleDes ? "block" : "hidden"}>
          <section className="flex flex-col text-sm text-[#46494F] leading-[21px] gap-y-4 lg:py-6 mb:pt-[19px]">
            <div
              dangerouslySetInnerHTML={{ __html: formattedDescription }}
              className="show_description my-4"
            />
          </section>
        </div>

        {!toggleDes && isLoading && (
          <div className="flex justify-center items-center h-40">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          </div>
        )}

        {!toggleDes &&
          !isLoading &&
          data?.review?.length > 0 &&
          data.review.map((reviewItem) => (
            <div key={reviewItem._id}>
              {reviewItem?.reviews.map((review) => (
                <section className="block" key={review._id}>
                  <div className="flex flex-col text-sm text-[#46494F] leading-[21px] gap-y-4 lg:pt-6 mb:pt-5 mb:pb-0">
                    <div className="border rounded-2xl lg:p-6 mb:p-5">
                      <div className="flex items-center justify-between gap-x-4 border-b border-[#F4F4F4] pb-4 mb-4">
                        <div>
                          <strong className="text-base text-[#1A1E26] font-medium">
                            {review.userId}
                            <span className="text-sm text-[#9D9EA2] font-light pl-[5px] pr-[5px]">
                              |
                            </span>
                            <span className="text-sm text-[#9D9EA2] font-light">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </strong>
                        </div>
                        <div className="flex gap-x-2">
                          {isOwnReview(review.userId) &&
                          editReviewId === review._id ? (
                            ""
                          ) : (
                            <>
                              <Popconfirm
                                title="Xóa đánh giá"
                                description="Bạn có chắc chắn muốn xóa đánh giá này?"
                                onConfirm={() =>
                                  deleteReview({
                                    reviewId: review._id,
                                    productId: review.productId,
                                    orderId: review.orderId,
                                  })
                                }
                                okText="Có"
                                cancelText="Không"
                              >
                                <Button danger>Xóa</Button>
                              </Popconfirm>
                              <Button
                                onClick={() =>
                                  handleEditClick(
                                    review._id,
                                    review.productId,
                                    review.orderId,
                                    review.contentReview,
                                    review.image_review,
                                    review.rating_review
                                  )
                                }
                              >
                                Cập nhật
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                      <section className="flex flex-col gap-y-4">
                        {editReviewId === review._id ? (
                          <Form
                            name="basic"
                            form={form}
                            onFinish={onFinish}
                            layout="vertical"
                            initialValues={{
                              contentReview: review.contentReview,
                              rating_review: review.rating_review || 0, // Đặt mặc định là 0 nếu không có giá trị
                              image_review: review.image_review,
                            }}
                          >
                            {/* Chỉnh sửa rating */}
                            <Form.Item name="rating_review">
                              <div className="flex items-center gap-1 mb-[20px]">
                                <Rate
                                  allowHalf={false} // Không cho phép nửa sao nếu không cần
                                  value={
                                    form.getFieldValue("rating_review") ||
                                    review.rating_review
                                  } // Lấy giá trị rating từ form
                                  onChange={(rate) => {
                                    form.setFieldsValue({
                                      rating_review: rate,
                                    }); // Cập nhật giá trị rating
                                    handleRatingChange(review._id, rate); // Gọi hàm xử lý khi người dùng thay đổi rating
                                  }}
                                  className="text-yellow-400 text-2xl" // Tùy chỉnh màu sắc với Tailwind
                                />
                              </div>
                            </Form.Item>
                            {/* Chỉnh sửa nội dung đánh giá */}
                            <Form.Item
                              name="contentReview"
                              label="Nội dung đánh giá"
                            >
                              <Input.TextArea rows={4} />
                            </Form.Item>
                            {/* Chỉnh sửa hình ảnh */}
                            <Form.Item name="image_review" label="Hình ảnh">
                              <Upload
                                listType="picture-card"
                                fileList={fileList} // Quản lý danh sách file
                                onChange={({ fileList: newFileList }) => {
                                  setFileList(newFileList);
                                }}
                                onPreview={handlePreview} // Xem trước hình ảnh
                                customRequest={async ({
                                  file,
                                  onSuccess,
                                  onError,
                                }) => {
                                  const formData = new FormData();
                                  formData.append("file", file);
                                  formData.append("upload_preset", PRESET_NAME); // Upload preset
                                  formData.append("folder", FOLDER_NAME); // Folder

                                  try {
                                    const response = await fetch(api, {
                                      method: "POST",
                                      body: formData,
                                    });
                                    const result = await response.json();

                                    // Sau khi upload thành công, cập nhật URL cho file
                                    file.url = result.secure_url;
                                    onSuccess?.();

                                    // Cập nhật fileList mới
                                    setFileList((prevList) =>
                                      prevList.map((f) =>
                                        f.uid === file.uid
                                          ? { ...f, url: result.secure_url }
                                          : f
                                      )
                                    );

                                    // Cập nhật form mà không thêm URL trùng lặp
                                    const currentImages =
                                      form.getFieldValue("image_review") || [];
                                    if (
                                      !currentImages.includes(result.secure_url)
                                    ) {
                                      form.setFieldsValue({
                                        image_review: [
                                          ...currentImages,
                                          result.secure_url,
                                        ],
                                      });
                                    }
                                  } catch (error) {
                                    console.error("Upload error:", error);
                                    onError?.(error);
                                  }
                                }}
                              >
                                {fileList.length >= 8 ? null : uploadButton}
                              </Upload>

                              <Modal
                                open={previewOpen}
                                footer={null}
                                onCancel={() => setPreviewOpen(false)}
                              >
                                <Image src={previewImage} />
                              </Modal>
                            </Form.Item>

                            {/* Các nút hành động */}
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                className="mr-[5px]"
                              >
                                Lưu
                              </Button>
                              <Button type="default" onClick={handleCancel}>
                                Hủy
                              </Button>
                            </Form.Item>
                          </Form>
                        ) : (
                          <div>
                            <div className="flex items-center  mb-[10px]">
                              <Rate
                                allowHalf // Cho phép hiển thị nửa sao
                                allowClear={false}
                                disabled={
                                  !!review.rating_review ||
                                  !review.rating_review
                                } // Không cho chỉnh sửa nếu đã có đánh giá
                                value={review.rating_review || 0}
                              />
                              {/* {Array.from({ length: 5 }, (_, index) => (
                                <span key={index}>
                                  {index <
                                  (rating[review._id] ||
                                    review.rating_review) ? (
                                    <AiFillStar className="text-yellow-400 text-2xl" />
                                  ) : (
                                    <AiOutlineStar className="text-yellow-400 text-2xl" />
                                  )}
                                </span>
                              ))} */}
                            </div>
                            <p className="text-[#1A1E26] text-base">
                              {review.contentReview}
                            </p>
                            <div className="mt-[20px] flex flex-wrap gap-2">
                              {review.image_review &&
                              review.image_review.length > 0 ? (
                                review.image_review.map((imageUrl, index) => (
                                  <div
                                    key={index}
                                    className="relative w-[120px] h-[120px]"
                                  >
                                    <img
                                      src={imageUrl}
                                      alt={`Review Image ${index + 1}`}
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                      }}
                                    />
                                  </div>
                                ))
                              ) : (
                                <p className="text-gray-500">
                                  No images available
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </section>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default DescriptionProduct;
