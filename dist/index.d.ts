import { Plugin } from 'vite';

declare global {
    interface Window {
        dataLayer: any[];
        gtag: Function;
    }
}
declare type GAConfiguration = {
    send_page_view?: boolean;
    allow_google_signals?: boolean;
    allow_ad_personalization_signals?: boolean;
    transport_url?: string;
    cookie_domain?: string;
    cookie_expires?: number;
    cookie_prefix?: string;
    cookie_update?: boolean;
    cookie_flags?: string;
};
declare type GoogleAnaliticsProperty = {
    id: string;
    source?: string;
    disable?: boolean;
    config?: GAConfiguration;
    persistentValues?: Record<string, string | number | boolean>;
};
declare type GoogleAnaliticsOptions = GoogleAnaliticsProperty | GoogleAnaliticsProperty[];

declare global {
    interface Window {
        dataLayer: any[];
    }
}
declare type GoogleTagManagerProperty = {
    id: string;
};
declare type GoogleTagManagerOptions = GoogleTagManagerProperty | GoogleTagManagerProperty[];

declare global {
    interface Window {
        fbq: Function;
    }
}
declare type FacebookPixel = {
    /**
     * Pixel tag
     */
    id: string;
};
declare type FacebookPixelOption = FacebookPixel | FacebookPixel[];

declare global {
    interface Window {
        _linkedin_data_partner_ids: any[];
    }
}
declare type LinkedinInsightProperty = {
    id: string;
};
declare type LinkedinInsightOptions = LinkedinInsightProperty | LinkedinInsightProperty[];

declare global {
    interface Window {
        _hmt: any[];
    }
}
declare type BaiduTongjiProperty = {
    id: string;
};
declare type BaiduTongjiOptions = BaiduTongjiProperty | BaiduTongjiProperty[];

declare global {
    interface Window {
        ym: Function;
    }
}
declare type MetricaConfiguration = {
    defer?: boolean;
    clickmap?: boolean;
    trackLinks?: boolean;
    accurateTrackBounce?: boolean;
    childIframe?: boolean;
    webvisor?: boolean;
    trackHash?: boolean;
    triggerEvent?: boolean;
    ecommerce?: string | boolean | any[];
    trustedDomains?: string[];
    type?: number;
    params?: Record<string, string | number | boolean> | Record<string, string | number | boolean>[];
    userParams?: Record<string, string | number | boolean>;
};
declare type YandexMetricaProperty = {
    id: string;
    config?: MetricaConfiguration;
};
declare type YandexMetricaOptions = YandexMetricaProperty | YandexMetricaProperty[];

declare global {
    interface Window {
        uetq: any[];
    }
}
declare type MicrosoftAdvertisingOptions = {
    id: string;
};

declare type VitePluginRadarOptions = {
    enableDev?: boolean;
    analytics?: GoogleAnaliticsOptions;
    gtm?: GoogleTagManagerOptions;
    pixel?: FacebookPixelOption;
    linkedin?: LinkedinInsightOptions;
    tongji?: BaiduTongjiOptions;
    metrica?: YandexMetricaOptions;
    microsoft?: MicrosoftAdvertisingOptions;
};
declare function VitePluginRadar({ enableDev, analytics, gtm, pixel, linkedin, tongji, metrica, microsoft, }: VitePluginRadarOptions): Plugin;

export { VitePluginRadar, VitePluginRadarOptions, VitePluginRadar as default };
