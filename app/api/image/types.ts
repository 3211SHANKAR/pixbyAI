export type Hit = {
    id: number;
    tags: string;
    previewURL: string;
    previewWidth: number;
    previewHeight: number;
    webformatURL: string;
    webformatWidth: number;
    webformatHeight: number;
    largeImageURL: string;
    views: number;
    downloads: number;
    user: string;
    userImageURL: string;
    pageURL: string;
};


export type ImageItem = {
    category: string;
    title: string;
    tags: string[];
    src: string;
    largeImageURL: string;
    views: number;
    downloads: number;
    user: string;
    userImageURL: string;
    pageURL: string;
  };