import * as httpRequest from '~/utils/httpRequest';

export const search = async (q, type = 'less') => {
    try {
        const res = await httpRequest.get('users', {
            params: {
                q,
                type,
            },
        });
        // return res.data; //tuy format cua api    
        return res;    
    } catch (error) {
        console.log(error);
    }
};
