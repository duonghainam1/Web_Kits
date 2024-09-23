import Products from "../../../components/common/Items/Products";
import img_product from "../../../assets/Images/Products/product_1.png";
import { Query_Products } from "../../../common/hooks/Products/Products";
import { IProduct } from "../../../common/interfaces/Product";

const ProductRelated = ({ product }: { product: IProduct }) => {
  const a: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const data = Query_Products();
  const san_pham_cung_loai = data?.data?.filter(
    (item: IProduct) => item?.category_id === product?.category_id
  );

  return (
    <div className="w-full mt-[10px]">
      <div className="max-w-[1440px] mb:w-[95%] mb:mx-[2.5%] md:mx-auto *:w-full">
        <hr />
        <div className="pt-[60px]">
          <h2 className="text-xl font-semibold">Sản phẩm tương tự</h2>
          <div className="grid grid-cols-2 gap-6 mt-4 lg:grid-cols-4">
            {san_pham_cung_loai?.map((item: IProduct) => (
              <Products key={item._id} items={item} />
            ))}
          </div>
          {/* chu y sau nay phan trang limit item = 20 */}
          <div className="grid xl:grid-cols-5 md:grid-cols-3 mb:grid-cols-2 md:gap-8 gap-3 mt-5 md:auto-rows-[400px] mb:auto-rows-[250px]">
            {/* INFOR P */}
            {/* --  */}
            {a?.map((i) => (
              <Products data={{ img_product, i }} />
            ))}
            {/* -- */}

            {/* END INFOR P */}
          </div>
        </div>
        {/* END RECOMMEND */}
      </div>
    </div>
  );
};

export default ProductRelated;
