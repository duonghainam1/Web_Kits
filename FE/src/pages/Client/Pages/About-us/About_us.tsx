import { Link } from "react-router-dom";
import { ArrowRight } from "../../../../resources/svg/Icon/Icon";
import { LoadingOutlined } from "@ant-design/icons";
import { ICategory } from "../../../../common/interfaces/Category";
import { useCategoryQuery } from "../../../../common/hooks/Category/useCategoryQuery";
import ScrollTop from "../../../../common/hooks/Customers/ScrollTop";
const AboutUS = () => {
  //const arr = [1, 2, 3];
  const { data, isLoading } = useCategoryQuery();
  const visibleCategories =
    data?.filter((category: ICategory) => category.published) || [];

  if (isLoading) return <LoadingOutlined />;
  return (
    <div className="container lg:mt-[40px] mt-[60px]">
      <div className="text-sm py-6 bg-[#F3F3F3] font-medium px-[2.5%] rounded">
        <Link to={`/`} className="text-gray-500 hover:text-black">
          Trang chủ
        </Link>
        <span className="mx-1 text-gray-500">&#10148;</span>
        Về chúng tôi
      </div>
      <div className="mb-20">
        <div className="mb-10 text-center">
          <div className="mb-20 mt-9 ">
            <p className="mb-5 text-xl font-bold tracking-wider uppercase ">
              Gặp gỡ đội ngũ của chúng tôi
            </p>
            <nav className="lg:w-[700px] w-[90%] mx-auto lg:text-base text-sm text-center text-gray-500 ">
              Chào mừng bạn đến với SEVEN, nơi chúng tôi không chỉ đơn thuần là
              một cửa hàng quần áo, mà còn là nơi thể hiện phong cách và cá tính
              riêng của bạn. Chúng tôi tin rằng thời trang không chỉ là về việc
              mặc đẹp, mà còn là một cách để thể hiện con người thật của bạn. Sứ
              mệnh của chúng tôi là mang đến những bộ trang phục chất lượng cao,
              hiện đại, và phong cách, giúp bạn tự tin hơn trong mọi khoảnh khắc
              của cuộc sống.
            </nav>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cold-2 grid-cols-1 gap-8 *:bg-gray-100 *:cursor-pointer *:duration-300 *:rounded">
            <div className="border p-[25px] hover:scale-105">
              <img
                src="../../../src/resources/images/teams/chung.png"
                alt=""
                className="object-fill w-full h-48"
              />
              <div className="text-left pt-[25px]">
                <p className=" text-[18px] text-gray-500 pb-3">Bảo Chung</p>
                <p className="text-sm">Nhà sáng lập của SEVEN.</p>
                {/* <nav className="text-sm">
                  Sứ mệnh của tôi là mang đến cho khách hàng những sản phẩm thời
                  trang đỉnh cao, kết hợp giữa phong cách hiện đại và chất lượng
                  bền vững.
                </nav> */}
              </div>
            </div>
            <div className="border p-[25px] hover:scale-105">
              <img
                src="../../../src/resources/images/teams/sau.png"
                alt=""
                className="object-fill w-full h-48"
              />
              <div className="text-left pt-[25px]">
                <p className=" text-[18px] text-gray-500 pb-3">Thị Gấm</p>
                <p className="text-sm">Nhà sáng lập của SEVEN.</p>
                {/* <nav className="text-sm">
                  Mỗi bộ sưu tập của tôi đều là sự kết hợp giữa nghệ thuật và xu
                  hướng thời trang toàn cầu, giúp khách hàng tỏa sáng với phong
                  cách riêng biệt.
                </nav> */}
              </div>
            </div>
            <div className="border p-[25px] hover:scale-105">
              <img
                src="../../../src/resources/images/teams/duong.png"
                alt=""
                className="object-fill w-full h-48"
              />
              <div className="text-left pt-[25px]">
                <p className=" text-[18px] text-gray-500 pb-3">Nam Dương</p>
                <p className="text-sm">Nhà sáng lập của SEVEN.</p>
                {/* <nav className="text-sm">
                  Thời trang là nghệ thuật, và mỗi khách hàng của SEVEN chính là
                  một nghệ sĩ. Tôi tin rằng quần áo không chỉ là thứ để mặc mà
                  là cách để bạn thể hiện bản thân.
                </nav> */}
              </div>
            </div>

            <div className="border p-[25px] hover:scale-105">
              <img
                src="../../../src/resources/images/teams/lam.png"
                alt=""
                className="object-fill w-full h-48"
              />
              <div className="text-left pt-[25px]">
                <p className=" text-[18px] text-gray-500 pb-3">Tú Lâm</p>
                <p className="text-sm">Nhà sáng lập của SEVEN.</p>
                {/* <nav className="text-sm">
                  Thời trang là thể hiện cá tính và sự sáng tạo. SEVEN mang đến
                  sản phẩm phản ánh xu hướng và khuyến khích bạn tự tin thể hiện
                  phong cách riêng.
                </nav> */}
              </div>
            </div>

            <div className="border p-[25px] hover:scale-105">
              <img
                src="../../../src/resources/images/teams/trung.png"
                alt=""
                className="object-fill w-full h-48"
              />
              <div className="text-left pt-[25px]">
                <p className=" text-[18px] text-gray-500 pb-3">Đức Trung</p>
                <p className="text-sm">Nhà sáng lập của SEVEN.</p>
                {/* <nav className="text-sm">
                  Tại SEVEN, chúng tôi thiết kế sản phẩm không chỉ để mặc mà để
                  tạo cảm xúc. Thời trang là công cụ để bạn tỏa sáng và thể hiện
                  cá tính độc đáo.
                </nav> */}
              </div>
            </div>

            <div className="border p-[25px] hover:scale-105">
              <img
                src="../../../src/resources/images/teams/minh.png"
                alt=""
                className="object-fill w-full h-48"
              />
              <div className="text-left pt-[25px]">
                <p className=" text-[18px] text-gray-500 pb-3">Công Minh</p>
                <p className="text-sm">Nhà sáng lập của SEVEN.</p>
                {/* <nav className="text-sm">
                  Thời trang tại SEVEN là sự kết hợp giữa sáng tạo và thực tiễn.
                  Chúng tôi tạo sản phẩm giúp bạn thể hiện cá tính, đồng thời
                  đảm bảo sự thoải mái và phong cách.
                </nav> */}
              </div>
            </div>

            <div className="border p-[25px] hover:scale-105">
              <img
                src="../../../src/resources/images/teams/duc.jpg"
                alt=""
                className="object-fill w-full h-48"
              />
              <div className="text-left pt-[25px]">
                <p className=" text-[18px] text-gray-500 pb-3">Anh Đức</p>
                <p className="text-sm">Nhà sáng lập của SEVEN.</p>
                {/* <nav className="text-sm">
                  Tại SEVEN, thời trang là cuộc phiêu lưu cá nhân. Mỗi bộ sưu
                  tập giúp bạn khám phá bản thân và tạo dấu ấn độc đáo, từ trang
                  phục hàng ngày đến sự kiện đặc biệt.
                </nav> */}
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <iframe
            className="lg:w-[1400px] lg:h-[685px] w-full my-10"
            src="https://www.youtube.com/embed/_9VUPq3SxOc"
          ></iframe>
        </div> */}
        <div className="my-10 text-center">
          <h2 className="pt-9 mb-[30px] text-[42px]  tracking-wider ">
            Bộ sưu tập của chúng tôi
          </h2>
          <div className=" grid lg:grid-cols-3 md:grid-cold-2 grid-cols-1 gap-3 text-center *:duration-300 *:cursor-pointer *:overflow-hidden *:rounded *:lg:shadow-lg *:shadow">
            {visibleCategories?.map((category: ICategory) => (
              <div className="text-center lg:w-[459.68px] lg:h-[514.67px] image-container hover:scale-105">
                <Link
                  to={`/shops?category=${category._id}`}
                  onClick={ScrollTop}
                >
                  {" "}
                  <img
                    src={category.image_category}
                    alt=""
                    className="w-full h-[461px]"
                  />
                  <p className="flex items-center justify-center p-3 text-lg font-bold">
                    {category.name_category}
                    <div className="w-5 h-5 ml-2">
                      <ArrowRight />
                    </div>
                  </p>
                </Link>
              </div>
            ))}

            {/* <div className="border border-gray-300">
              <div className="text-center image-container">
                <img
                  src="../../../src/resources/images/products/interior-design-concept-sale-home-260nw-2169578877.webp"
                  alt=""
                  className="w-full h-96"
                />
                <p className="flex items-center justify-center p-3 mt-5 text-lg font-thin">
                  Dép Màu Đen
                  <div className="w-5 h-5 ml-2">
                    <ArrowRight />
                  </div>
                </p>
              </div>
            </div>
            <div className="border border-gray-300">
              <div className="text-center image-container">
                <img
                  src="../../../src/resources/images/products/interior-design-concept-sale-home-260nw-2169578877.webp"
                  alt=""
                  className="w-full h-96"
                />
                <p className="flex items-center justify-center p-3 mt-5 text-lg font-thin">
                  Dép Màu Đen
                  <div className="w-5 h-5 ml-2">
                    <ArrowRight />
                  </div>
                </p>
              </div>
            </div> */}
          </div>

          <div className="flex items-center justify-center my-10  mx-auto h-[60px] w-[144px]  hover:bg-gray-100 duration-200 hover:text-black border border-black  bg-black cursor-pointer text-white">
            {" "}
            <Link className="text-[15px] px-[30px] " to={""}>
              Xem tất cả
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUS;
