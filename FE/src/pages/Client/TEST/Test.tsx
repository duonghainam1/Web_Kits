import { EyeOutlined, HeartOutlined } from '@ant-design/icons'
import { Button, Card, Col, Image, Row, Tooltip } from 'antd'
import { Link } from 'react-router-dom'

const Test = () => {
    return (
        <div className='mt-28'>
            <Row gutter={[16, 16]}>
                {[...Array(5)].map((_, index) => (
                    <Col key={index} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            className="w-full"
                            cover={
                                <div className="relative group">
                                    <Link to={''}>
                                        <Image
                                            src='../../src/assets/Images/Products/no-data.png'
                                            className="duration-500 group-hover:scale-105"
                                            style={{ height: '250px', objectFit: 'cover' }}
                                        />
                                    </Link>
                                    <div className="absolute flex flex-col bg-white rounded top-0 pt-1 right-0 transform -translate-y-full group-hover:translate-y-0 duration-200 opacity-0 group-hover:opacity-100">
                                        <Tooltip title="Add to Wishlist">
                                            <Button
                                                shape="circle"
                                                icon={<HeartOutlined />}
                                                className="hover:scale-110"
                                            />
                                        </Tooltip>
                                        <Tooltip title="Quick View">
                                            <Button
                                                shape="circle"
                                                icon={<EyeOutlined />}
                                                className="hover:scale-110"
                                            />
                                        </Tooltip>
                                    </div>
                                </div>
                            }
                        >
                            <Link
                                to={`#`}
                                className="text-base font-medium text-gray-700 lg:text-lg hover:text-black line-clamp-2"
                            >
                                {/* {items.name_product} */}
                                kkkkk
                            </Link>
                            <p className="font-semibold text-red-500 text-md">
                                {/* {items.price_product.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })} */}
                                11111
                            </p>
                            {/* 
                {modalOpen && selectedProduct && (
                  <ProductModal product={selectedProduct} onClose={handleCloseModal} />
                )} 
              */}
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Test