export type PostEdgeList = {
  edges: {
    node: PostPreview;
  }[];
};

export type PostPreview = {
  brief: string;
  title: string;
  slug: string;
  coverImage: string;
  id: string;
};

export type PostSeries = {
  seriesSlug: string;
  posts: PostEdgeList;
};


export interface PostInterface {
  title: string;
  content: {
    markdown: string;
  };
}

