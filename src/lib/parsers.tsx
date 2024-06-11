import axios from "axios";

// deno-lint-ignore no-explicit-any
export const getPreviewContent = async (url: string): Promise<IShareContent | null> => {
    const api = "http://liwuhuan.top:3000/parse/link";
    try {
        const response = await axios.post(api, { url: url }, { timeout: 5000 });  // Timeout set to 5000 milliseconds (5 seconds)
        const { title, img } = response.data;
        return {
            title: title,
            img: img,
            link: url,
        };
    } catch (error) {
        return null;
    }
}

// deno-lint-ignore-file no-explicit-any
export const RE_HTTP_HTTPS =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm

const SITES_MAP = {
    bilibili: ['bilibili.com', 'b23.tv'],
    music163: ['music.163.com', '163cn.tv'],
    qqmusic: ['y.qq.com'],
    wechat: ['mp.weixin.qq.com'],
    xhs: ['xhslink.com', 'xiaohongshu.com'],
    // zhihu: ['zhihu.com'],
    // weibo: ['weibo.com', 'weibo.cn'],
    douyin: ['douyin.com'],
    douban: ['douban.com'],
}

const SITE_ICON_MAP = {
    xhs: 'https://chat-ncu.oss-cn-nanjing.aliyuncs.com/xiaohongshu_logo.png',
    douyin: 'https://chat-ncu.oss-cn-nanjing.aliyuncs.com/douyin_logo.svg',
}

export const SITES = Object.keys(SITES_MAP)

const getSiteName = (site: string) => {
    const url = new URL(site)
    const hostname = url.hostname
    const siteName = SITES.find((key) => {
        const list = (SITES_MAP as any)[key]
        return list.some((item: string) => {
            const [long, short] = hostname.length > item.length ? [hostname, item] : [item, hostname]
            return long.includes(short)
        })
    })
    return siteName
}

const isValidSite = (siteName?: string) => {
    return siteName && SITES.includes(siteName)
}

export interface IShareContent {
    title: string,
    img: string,
    link: string,
}

export const parseShareContent = async (content: string): Promise<IShareContent | null> => {
    const matched = content.match(RE_HTTP_HTTPS)
    if (!matched || matched.length <= 0) return null;
    const url = matched[0]

    const siteName = getSiteName(url)
    console.log(siteName);

    if (isValidSite(siteName)) {
        if (siteName === 'xhs') {
            return {
                title: '我分享了一篇小红书笔记？快来看吧！',
                link: url,
                img: SITE_ICON_MAP.xhs
            }
        } else if (siteName === 'douyin') {
            return {
                title: '我分享了一条抖音，快来看看吧！',
                link: url,
                img: SITE_ICON_MAP.douyin
            }
        }

        return await getPreviewContent(url);
    }

    return null;
}