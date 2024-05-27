import { IGetSTSTokenResponse } from '@/store';
import { cacheGet,cacheSet } from '@/lib/localstorage';
import { COMMON_CONFIG } from '@/config';
import { getSTSToken } from '@/api/chat';

const GetSTSToken = async (): Promise<IGetSTSTokenResponse | null> => {
    let stsToken = cacheGet(COMMON_CONFIG.STSTOKENCACHEKEY) as IGetSTSTokenResponse;
    if (!stsToken) {
        try {
            const res = await getSTSToken();
            stsToken = res;
            cacheSet(COMMON_CONFIG.STSTOKENCACHEKEY, stsToken);
        } catch (e) {
            console.log(e);
            return null;
        }
    } else {
        const now = new Date().getTime();
        // If the token is not expired, return the token
        const expirationTime = new Date(stsToken.expiration).getTime();
        if (expirationTime && expirationTime < now) {
            const res = await getSTSToken();
            stsToken = res;
            cacheSet(COMMON_CONFIG.STSTOKENCACHEKEY, stsToken);
        }
    }

    return stsToken;
}

export default GetSTSToken;