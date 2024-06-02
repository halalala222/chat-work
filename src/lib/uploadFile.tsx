import OSS from 'ali-oss';
import getSTSToken from '@/lib/getSTSToken';

const getFileType = (file: File): string => {
    return file.type.split('/')[1];
}

const UploadFile = async ({ file, userID }: { file: File, userID: number }): Promise<string | null> => {
    const stsToken = await getSTSToken();
    if (!stsToken) {
        return null;
    }
    const fileType = getFileType(file);
    const client = new OSS({
        // 将<YOUR_BUCKET>设置为OSS Bucket名称。
        bucket: "chat-ncu",
        // 将<YOUR_REGION>设置为OSS Bucket所在地域，例如region: 'oss-cn-hangzhou'。
        region: "oss-cn-nanjing",
        accessKeyId: stsToken.accessKeyId,
        accessKeySecret: stsToken.accessKeySecret,
        stsToken: stsToken.securityToken,
    });
    const uuid = userID + '-' + new Date().getTime() + '.' + fileType;
    console.log(uuid);
    try {
        const result = await client.put(uuid, file);
        return result.url;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export default UploadFile;