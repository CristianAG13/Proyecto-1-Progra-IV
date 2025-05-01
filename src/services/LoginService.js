import axios from 'axios';

const User_API_URL = 'https://api.jsonbin.io/v3/b/681317a08a456b7966951ef1';
const Api_Key = '$2a$10$lEkMys02t4G.CsI7y2QuROLkj9Z5.KXehSKPDdH8tQySMH22HLL4y';

export const LoginService = async (email, password) => {
    try {
        const response = await axios.get(User_API_URL, {
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': Api_Key
            }
        });

        const users = response.data.record.users;

        const user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            console.log('No se encontró el usuario');
            return { status: 401, message: 'Invalid email or password' };
        } else {
            console.log('Login successful:', user);
            return { status: 200, user };  
        }

    } catch (error) {
        console.error('Error during login:', error);
        return { status: 500, message: 'Server error' };
    }
};
