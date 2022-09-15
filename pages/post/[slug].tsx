import { RichText } from '@graphcms/rich-text-react-renderer';
import { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
// import RenderRichText from '../../components/RenderRichText';
import { getPostDetails, getPosts, PostData, Posts } from '../../services';

const RenderRichText = dynamic(
  () => import('../../components/RenderRichText'),
  {
    ssr: false,
  },
);

interface Props {
  post: PostData;
}

export default function PostDetail({ post }: Props) {
  console.log('post~~~: ', post);

  return (
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <img src={post.featuredImage.url} alt="" />
      </div>
      {post.title}
      {post.excerpt}
      <div>
        <h1>ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ</h1>
        <RenderRichText raw={post.content.raw} />
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: { node: PostData }[] = (await getPosts()) || [];

  // console.log('######### posts: ', posts);

  const paths = posts.map(({ node }) => ({
    params: { slug: node.slug },
  }));

  // const paths = [
  //   {
  //     params: {
  //       slug: 'hello-world',
  //     },
  //   },
  // ];

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log('params: ', params);

  const post = params
    ? await getPostDetails(
        Array.isArray(params.slug) ? params.slug[0] : params.slug || '',
      )
    : [];

  // console.log('slug: ', params ? params.slug : 'no slug');

  return {
    props: {
      post,
    },
    revalidate: 1,
  };
};
