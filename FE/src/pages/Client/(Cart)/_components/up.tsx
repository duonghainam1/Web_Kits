import React from 'react';
import { Button } from 'antd';
import { toast } from 'react-toastify'
import useLocalStorage from '../../../../common/hooks/Storage/useStorage';
import { Mutation_Cart } from '../../../../common/hooks/Cart/mutation_Carts';
const Up_btn = ({ dataProps }: any) => {
    const [user] = useLocalStorage("user", {});
    const account = user?.user;
    const { mutate } = Mutation_Cart('UP');
    function up() {
        let quantity_attr: number = 0;
        if (dataProps?.id_item?.attributes) {
            const x = dataProps?.id_item?.attributes?.values?.find(a => a?.color?.toString() == dataProps?.color?.toString());
            const y = x?.size?.find(b => b?.name_size?.toString() === dataProps?.size?.toString())
            if (x && y) {
                quantity_attr = y?.stock_attribute
            }
        }
        else {
            quantity_attr = dataProps?.id_item?.stock
        }
        const data = {
            userId: account,
            productId: dataProps?.id_item,
            color: dataProps?.color,
            size: dataProps?.size
        }
        if (dataProps?.quantity_item >= quantity_attr) {
            toast.error('Vượt quá số lượng sản phẩm!', { autoClose: 500 })
        } else {
            mutate(data)
        }
    }

    return (
        <Button onClick={up}> + </Button>
    )
}

export default Up_btn