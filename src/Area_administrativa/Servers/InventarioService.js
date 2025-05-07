import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

const User_API_URL = 'https://api.jsonbin.io/v3/b/681a862f8561e97a500f0e30';
const Api_Key = '$2a$10$lEkMys02t4G.CsI7y2QuROLkj9Z5.KXehSKPDdH8tQySMH22HLL4y';


const FetchInventario = async () => {
    try {
        console.log("Fetching inventory data...");
        const response = await axios.get(User_API_URL, {
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': Api_Key
        },
        });
        console.log("API Response:", response);
        
        if (response.status !== 200) {
            throw new Error('Error fetching users');
        }
        if (!response.data || !response.data.record) {
            console.log("Invalid response format, data:", response.data);
            throw new Error('Invalid response format');
        }
        console.log("Inventory data:", response.data.record);
        return response.data.record; 
    } catch (error) {
        console.error("Error fetching inventory:", error);
        throw error;
    }
};

export const UpdateInventario = async (inventario) => {
    try {
        console.log("Actualizando inventario:", inventario);
        const response = await axios.put(User_API_URL, inventario, {
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': Api_Key
            },
        });
        console.log("API Response:", response);
        
        if (response.status !== 200) {
            throw new Error('Error al actualizar inventario');
        }
        return response.data.record; 
    } catch (error) {
        console.error("Error al actualizar inventario:", error);
        throw error;
    }
}



export const useInventario = () => {
    return useQuery({
        queryKey: ['inventario'],
        queryFn: FetchInventario,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    });
};
