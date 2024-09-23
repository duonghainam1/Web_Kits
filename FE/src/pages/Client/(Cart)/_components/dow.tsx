import useLocalStorage from '../../../../common/hooks/Storage/useStorage';
import { Mutation_Cart } from '../../../../common/hooks/Cart/mutation_Carts';
import Swal from 'sweetalert2'
import { Button } from 'antd';

const Dow_btn = ({ dataProps }: any) => {
    const [user] = useLocalStorage("user", {});
    const account = user?.user;
    const { mutate } = Mutation_Cart('DOW');
    function dow() {
        const data = {
            userId: account,
            productId: dataProps?.id_item,
            color: dataProps?.color,
            size: dataProps?.size
        }
        if (dataProps.quantity_item < 2) {
            Swal.fire({
                title: `Xác nhận xóa sản phẩm trong giỏ hàng?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Xác nhận!",
                cancelButtonText : 'Hủy',
            }).then((result: any) => {
                if (result.isConfirmed) {
                    mutate(data)
                }
            });
        } else {
            const data = {
                userId: account,
                productId: dataProps?.id_item,
                color: dataProps?.color,
                size: dataProps?.size
            }
            mutate(data)
        }
    }
    return (
        <Button onClick={dow}> - </Button>
    )
}

export default Dow_btn